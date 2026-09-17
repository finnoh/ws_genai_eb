import React, {useEffect, useMemo, useRef, useState} from 'react';
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
  const [selectedId, setSelectedId] = useState<string>('');
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

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

  useEffect(() => {
    function selectExerciseFromQuery(): void {
      const requestedId = new URLSearchParams(window.location.search).get('exercise')?.toUpperCase() || '';
      setSelectedId(exercises.some((exercise) => exercise.id === requestedId) ? requestedId : '');
    }

    selectExerciseFromQuery();
    window.addEventListener('popstate', selectExerciseFromQuery);
    return () => window.removeEventListener('popstate', selectExerciseFromQuery);
  }, []);

  useEffect(() => {
    if (selectedId) {
      cardRefs.current[selectedId]?.focus();
    }
  }, [selectedId]);

  const day1Links = links.filter((link) => link.day === 'Day 1');
  const day2Links = links.filter((link) => link.day === 'Day 2');

  function toSitePath(path: string): string {
    return `${baseUrl}${path}#/title-slide`;
  }

  function renderCard(link: ExerciseLink): React.ReactElement {
    const isSelected = link.id === selectedId;

    return (
      <article
        key={link.id}
        ref={(card) => {
          cardRefs.current[link.id] = card;
        }}
        className={`${styles.card}${isSelected ? ` ${styles.active}` : ''}`}
        tabIndex={isSelected ? -1 : undefined}>
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
    <div className={styles.dayColumns}>
      <section>
        <h3 className={styles.dayHeading}>Day 1 — AI Agents in Research</h3>
        <p>May 13, 2027 · Beginner · E07–E12</p>
        <div className={styles.dayCards}>{day1Links.map(renderCard)}</div>
      </section>
      <section>
        <h3 className={styles.dayHeading}>Day 2 — Building AI Agents</h3>
        <p>May 14, 2027 · Advanced · E01–E06</p>
        <div className={styles.dayCards}>{day2Links.map(renderCard)}</div>
      </section>
    </div>
  );
}
