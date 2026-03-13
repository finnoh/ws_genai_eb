import React, {useEffect, useMemo, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {exercises} from '@site/src/data/exercises';

import styles from './ExerciseLinks.module.css';

type ExerciseLink = {
  id: string;
  title: string;
  day: 'Day 1' | 'Day 2';
  durationMinutes: number;
  href: string;
  qrHref: string;
  answerType: 'text' | 'code' | 'link';
  prompt: string;
};

const STORAGE_ACTIVE_KEY = 'ti.live.activeExercise';
const STORAGE_GROUP_KEY = 'ti.live.groupCode';
const STORAGE_START_KEY = 'ti.live.startIso';

function readStoredValue(key: string): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.localStorage.getItem(key)?.trim() || '';
}

function sanitizeExerciseId(value: string): string {
  return value.trim().toUpperCase();
}

function withParam(url: string, key: string, value: string): string {
  const parsedUrl = new URL(url);
  parsedUrl.searchParams.set(key, value);
  return parsedUrl.toString();
}

export default function ExerciseLinks(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  const customFields = siteConfig.customFields || {};
  const formUrl = (customFields.googleFormUrl as string | undefined)?.trim() || '';
  const exerciseField =
    (customFields.googleFormExerciseField as string | undefined)?.trim() || '';
  const groupField = (customFields.googleFormGroupField as string | undefined)?.trim() || '';
  const configuredActive = (customFields.activeExerciseId as string | undefined)?.trim() || '';

  const pageParams =
    typeof window === 'undefined'
      ? new URLSearchParams('')
      : new URLSearchParams(window.location.search);
  const hostMode = pageParams.get('host') === '1';
  const urlExerciseId = sanitizeExerciseId(pageParams.get('exercise') || '');
  const urlGroup = (pageParams.get('group') || '').trim();
  const urlStart = (pageParams.get('start') || '').trim();

  const [copiedId, setCopiedId] = useState<string>('');
  const [now, setNow] = useState<number>(Date.now());
  const [activeExerciseId, setActiveExerciseId] = useState<string>(
    urlExerciseId || sanitizeExerciseId(readStoredValue(STORAGE_ACTIVE_KEY)) || sanitizeExerciseId(configuredActive),
  );
  const [groupCode, setGroupCode] = useState<string>(urlGroup || readStoredValue(STORAGE_GROUP_KEY));
  const [startIso, setStartIso] = useState<string>(urlStart || readStoredValue(STORAGE_START_KEY));
  const [showAll, setShowAll] = useState<boolean>(
    !(urlExerciseId || readStoredValue(STORAGE_ACTIVE_KEY) || configuredActive),
  );
  const [hostMinutes, setHostMinutes] = useState<number>(30);

  useEffect(() => {
    if (!activeExerciseId) {
      setShowAll(true);
    }
  }, [activeExerciseId]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (activeExerciseId) {
      window.localStorage.setItem(STORAGE_ACTIVE_KEY, activeExerciseId);
    } else {
      window.localStorage.removeItem(STORAGE_ACTIVE_KEY);
    }
  }, [activeExerciseId]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (groupCode) {
      window.localStorage.setItem(STORAGE_GROUP_KEY, groupCode);
    } else {
      window.localStorage.removeItem(STORAGE_GROUP_KEY);
    }
  }, [groupCode]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (startIso) {
      window.localStorage.setItem(STORAGE_START_KEY, startIso);
    } else {
      window.localStorage.removeItem(STORAGE_START_KEY);
    }
  }, [startIso]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const links = useMemo<ExerciseLink[]>(() => {
    if (!formUrl || !exerciseField) {
      return [];
    }

    return exercises.map((exercise) => {
      let href = withParam(formUrl, `entry.${exerciseField}`, exercise.id);
      if (groupField && groupCode) {
        href = withParam(href, `entry.${groupField}`, groupCode);
      }
      const qrHref = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(href)}`;
      return {
        ...exercise,
        href,
        qrHref,
      };
    });
  }, [exerciseField, formUrl, groupCode, groupField]);

  async function copyLink(link: ExerciseLink): Promise<void> {
    try {
      await navigator.clipboard.writeText(link.href);
      setCopiedId(link.id);
      window.setTimeout(() => setCopiedId(''), 1200);
    } catch {
      setCopiedId('');
    }
  }

  const activeLink = links.find((link) => link.id === activeExerciseId);
  const visibleLinks = activeLink && !showAll ? [activeLink] : links;

  const parsedStart = startIso ? new Date(startIso).getTime() : Number.NaN;
  const hasCountdown = Boolean(activeLink) && Number.isFinite(parsedStart);
  const remainingMs =
    hasCountdown && activeLink
      ? parsedStart + activeLink.durationMinutes * 60_000 - now
      : Number.NaN;
  const remainingMinutes = Math.max(0, Math.ceil(remainingMs / 60000));

  useEffect(() => {
    if (activeLink) {
      setHostMinutes(activeLink.durationMinutes);
    }
  }, [activeLink]);

  function syncUrl(next: {exercise?: string; group?: string; start?: string}): void {
    if (typeof window === 'undefined') {
      return;
    }
    const url = new URL(window.location.href);
    if (hostMode) {
      url.searchParams.set('host', '1');
    }
    if (next.exercise) {
      url.searchParams.set('exercise', next.exercise);
    } else {
      url.searchParams.delete('exercise');
    }
    if (next.group) {
      url.searchParams.set('group', next.group);
    } else {
      url.searchParams.delete('group');
    }
    if (next.start) {
      url.searchParams.set('start', next.start);
    } else {
      url.searchParams.delete('start');
    }
    window.history.replaceState({}, '', url.toString());
  }

  function activateNow(): void {
    if (!activeExerciseId) {
      return;
    }
    const start = new Date().toISOString();
    setStartIso(start);
    syncUrl({exercise: activeExerciseId, group: groupCode, start});
  }

  function clearLiveState(): void {
    setStartIso('');
    setActiveExerciseId('');
    setShowAll(true);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_START_KEY);
      window.localStorage.removeItem(STORAGE_ACTIVE_KEY);
    }
    syncUrl({group: groupCode});
  }

  function activateWithOffset(): void {
    if (!activeExerciseId || !activeLink) {
      return;
    }
    const boundedMinutesLeft = Math.min(activeLink.durationMinutes, Math.max(0, hostMinutes));
    const elapsedMinutes = activeLink.durationMinutes - boundedMinutesLeft;
    const start = new Date(Date.now() - elapsedMinutes * 60_000).toISOString();
    setStartIso(start);
    syncUrl({exercise: activeExerciseId, group: groupCode, start});
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
      {hostMode ? (
        <div className={styles.hostPanel}>
          <strong>Host controls</strong>
          <div className={styles.hostControls}>
            <label>
              Active exercise
              <select
                value={activeExerciseId}
                onChange={(event) => setActiveExerciseId(sanitizeExerciseId(event.target.value))}>
                <option value="">None</option>
                {exercises.map((exercise) => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.id} - {exercise.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Group code
              <input value={groupCode} onChange={(event) => setGroupCode(event.target.value.trim())} />
            </label>
            <label>
              Timer minutes
              <input
                type="number"
                min={1}
                max={240}
                value={hostMinutes}
                onChange={(event) => setHostMinutes(Number(event.target.value) || 30)}
              />
            </label>
          </div>
          <div className={styles.statusActions}>
            <button type="button" className={styles.primaryButton} onClick={activateNow}>
              Start now
            </button>
            <button type="button" className={styles.secondaryButton} onClick={activateWithOffset}>
              Set time left
            </button>
            <button type="button" className={styles.secondaryButton} onClick={clearLiveState}>
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.participantBar}>
          <label>
            Group code
            <input value={groupCode} onChange={(event) => setGroupCode(event.target.value.trim())} />
          </label>
        </div>
      )}
      {activeLink ? (
        <div className={styles.statusBanner}>
          <p>
            Live now: <strong>{activeLink.id}</strong> - {activeLink.title}
            {hasCountdown ? ` | Time left: ${remainingMinutes} min` : ''}
          </p>
          <div className={styles.statusActions}>
            <a href={activeLink.href} target="_blank" rel="noreferrer" className={styles.primaryButton}>
              Open active form
            </a>
            <button type="button" className={styles.secondaryButton} onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show active only' : 'Show all exercises'}
            </button>
          </div>
        </div>
      ) : null}
      <p className={styles.hint}>
        URL params: <code>?exercise=E3</code>, <code>?group=A</code>,{' '}
        <code>?start=2026-03-09T09:30:00</code>, and <code>?host=1</code> for instructor mode.
      </p>
      <div className={styles.grid}>
        {visibleLinks.map((link) => {
          const isActive = link.id === activeExerciseId;
          return (
            <article key={link.id} className={`${styles.card} ${isActive ? styles.active : ''}`}>
              <p className={styles.meta}>
                {link.day} • {link.durationMinutes} min • {link.answerType}
              </p>
              <h3>
                {link.id}: {link.title}
              </h3>
              <p className={styles.prompt}>{link.prompt}</p>
              <div className={styles.actions}>
                <a href={link.href} target="_blank" rel="noreferrer" className={styles.primaryButton}>
                  Open form
                </a>
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
        })}
      </div>
    </div>
  );
}
