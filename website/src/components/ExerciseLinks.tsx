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

const availabilityPath = '/course-availability';

export default function ExerciseLinks(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  const baseUrl = (siteConfig.baseUrl || '/').replace(/\/$/, '');
  const availabilityHref = `${baseUrl}${availabilityPath}`;

  const [copiedId, setCopiedId] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string>('');
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const links = useMemo<ExerciseLink[]>(() => {
    return exercises.map((exercise) => {
      const href = `${availabilityHref}?exercise=${exercise.id}`;
      const shareUrl = new URL(href, siteConfig.url).href;
      const qrHref = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(shareUrl)}`;
      return {
        ...exercise,
        href,
        qrHref,
      };
    });
  }, [availabilityHref, siteConfig.url]);

  async function copyLink(link: ExerciseLink): Promise<void> {
    try {
      await navigator.clipboard.writeText(new URL(link.href, window.location.origin).href);
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
          <Link to={`${availabilityPath}?exercise=${link.id}`} className={styles.primaryButton}>
            Open form
          </Link>
          <Link to={availabilityPath} className={styles.secondaryButton}>
            Results sheet
          </Link>
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
