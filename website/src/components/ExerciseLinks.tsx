import React, {useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {exercises, type ExerciseItem} from '@site/src/data/exercises';
import {blocks} from '@site/src/data/blocks';

import styles from './ExerciseLinks.module.css';

type ExerciseLink = ExerciseItem & {href: string; qrHref: string};

const slidePathByExerciseId = Object.fromEntries(
  blocks.map((block) => [block.exerciseId, block.slidePath]),
) as Record<string, string>;

function withParam(url: string, key: string, value: string): string {
  const parsedUrl = new URL(url);
  parsedUrl.searchParams.set(key, value);
  return parsedUrl.toString();
}

export default function ExerciseLinks(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  const customFields = siteConfig.customFields || {};
  const baseUrl = (siteConfig.baseUrl || '/').replace(/\/$/, '');
  const formUrl = (customFields.googleFormUrl as string | undefined)?.trim() || '';
  const exerciseField =
    (customFields.googleFormExerciseField as string | undefined)?.trim() || '';
  const resultsSheetUrl = (customFields.resultsSheetUrl as string | undefined)?.trim() || '';

  const [copiedId, setCopiedId] = useState<string>('');

  const links = useMemo<ExerciseLink[]>(() => {
    if (!formUrl || !exerciseField) {
      return [];
    }

    return exercises.map((exercise) => {
      const href = withParam(formUrl, `entry.${exerciseField}`, exercise.id);
      const qrHref = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(href)}`;
      return {
        ...exercise,
        href,
        qrHref,
      };
    });
  }, [exerciseField, formUrl]);

  async function copyLink(link: ExerciseLink): Promise<void> {
    try {
      await navigator.clipboard.writeText(link.href);
      setCopiedId(link.id);
      window.setTimeout(() => setCopiedId(''), 1200);
    } catch {
      setCopiedId('');
    }
  }

  const day1Links = links.filter((link) => link.day === 'Day 1');
  const day2Links = links.filter((link) => link.day === 'Day 2');
  const rowCount = Math.max(day1Links.length, day2Links.length);

  function toSitePath(path: string): string {
    return `${baseUrl}${path}#/title-slide`;
  }

  function renderCard(link: ExerciseLink | undefined): React.ReactElement {
    if (!link) {
      return <div className={styles.cardSpacer} aria-hidden="true" />;
    }

    return (
      <article key={link.id} className={styles.card}>
        <p className={styles.meta}>
          {link.day} • {link.durationMinutes} min • {link.answerType}
        </p>
        <h3>
          <Link to={link.detailPath}>
            {link.title}
          </Link>
        </h3>
        <p className={styles.prompt}>{link.prompt}</p>
        <div className={styles.actions}>
          <a href={link.href} target="_blank" rel="noreferrer" className={styles.primaryButton}>
            Open form
          </a>
          {resultsSheetUrl ? (
            <a href={resultsSheetUrl} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
              Results sheet
            </a>
          ) : null}
          {slidePathByExerciseId[link.id] ? (
            <a href={toSitePath(slidePathByExerciseId[link.id])} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
              Slide deck
            </a>
          ) : null}
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => void copyLink(link)}>
            {copiedId === link.id ? 'Copied' : 'Copy link'}
          </button>
          <a href={link.qrHref} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
            QR
          </a>
        </div>
      </article>
    );
  }

  if (!formUrl) {
    return (
      <p>
        Configure <code>GOOGLE_FORM_URL</code> to enable exercise links.
      </p>
    );
  }

  if (!exerciseField) {
    return (
      <p>
        Configure <code>GOOGLE_FORM_EXERCISE_FIELD</code> to enable prefilled exercise links.
      </p>
    );
  }

  return (
    <div>
      <div className={styles.dayHeadings}>
        <h3 className={styles.dayHeading}>Day 1 (E01-E06)</h3>
        <h3 className={styles.dayHeading}>Day 2 (E07-E12)</h3>
      </div>

      <div className={styles.dayRows}>
        {Array.from({length: rowCount}).map((_, idx) => (
          <div key={`row-${idx}`} className={styles.dayRow}>
            {renderCard(day1Links[idx])}
            {renderCard(day2Links[idx])}
          </div>
        ))}
      </div>
    </div>
  );
}
