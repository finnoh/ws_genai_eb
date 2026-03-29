import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './ExerciseBlockPage.module.css';

import {
  getExerciseById,
  type ExerciseId,
} from '@site/src/data/exercises';

type Props = {
  exerciseId: ExerciseId;
  embedded?: boolean;
};

const URL_REGEX = /(https?:\/\/[^\s)]+)/g;

function renderWithLinks(text: string): React.ReactNode {
  const parts = text.split(URL_REGEX);
  return parts.map((part, idx) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={`url-${idx}`} href={part} target="_blank" rel="noreferrer">
          {part}
        </a>
      );
    }
    return <React.Fragment key={`txt-${idx}`}>{part}</React.Fragment>;
  });
}

function withParam(url: string, key: string, value: string): string {
  const parsedUrl = new URL(url);
  parsedUrl.searchParams.set(key, value);
  return parsedUrl.toString();
}

export default function ExerciseBlockPage({exerciseId, embedded = false}: Props): React.ReactElement {
  const exercise = getExerciseById(exerciseId);
  const {siteConfig} = useDocusaurusContext();
  const customFields = siteConfig.customFields || {};
  const formUrl = (customFields.googleFormUrl as string | undefined)?.trim() || '';
  const exerciseField =
    (customFields.googleFormExerciseField as string | undefined)?.trim() || '';

  const submissionHref =
    formUrl && exerciseField ? withParam(formUrl, `entry.${exerciseField}`, exercise.id) : '';

  return (
    <div className={styles.page}>
      {embedded ? (
        <section className="courseBand">
          <p>
            <strong>Exercise overview:</strong> {exercise.title}
          </p>
        </section>
      ) : (
        <section className={`courseHero ${styles.hero}`}>
          <p className="courseKicker">
            {exercise.day} · {exercise.block}
          </p>
          <h1 className={styles.heroTitle}>
            {exercise.id} - {exercise.title}
          </h1>
          {exercise.objectiveBullets && exercise.objectiveBullets.length > 0 ? (
            <ul className="courseLead">
              {exercise.objectiveBullets.map((item) => (
                <li key={item}>{renderWithLinks(item)}</li>
              ))}
            </ul>
          ) : (
            <p className="courseLead">{renderWithLinks(exercise.objective)}</p>
          )}
        </section>
      )}

      <section className="courseGrid">
        <article className="courseCard">
          <h3>Inputs</h3>
          <ul>
            {exercise.inputs.map((item) => (
              <li key={item}>{renderWithLinks(item)}</li>
            ))}
          </ul>
        </article>

        <article className="courseCard">
          <h3>Deliverable</h3>
          <p>{renderWithLinks(exercise.deliverable)}</p>
          <h3 className={styles.subhead}>Target</h3>
          <p>{renderWithLinks(exercise.prompt)}</p>
        </article>
      </section>

      <section className="courseGrid">
        <article className="courseCard">
          <h3>Submission</h3>
          <ul>
            <li>
              Use the live launcher: <Link to={`/docs/live-exercises?exercise=${exercise.id}`}>Live Exercises</Link>
            </li>
            {submissionHref ? (
              <li>
                Direct prefilled form:{' '}
                <a href={submissionHref} target="_blank" rel="noreferrer">
                  {exercise.id} submission link
                </a>
              </li>
            ) : (
              <li>Direct form unavailable until form settings are configured.</li>
            )}
          </ul>
        </article>

        <article className="courseCard">
          <h3>Checklist</h3>
          <ul>
            <li>Make one explicit design decision.</li>
            <li>Include one verification check.</li>
            <li>State one limitation or risk.</li>
          </ul>
        </article>
      </section>

      <section className="courseGrid">
        <article className="courseCard">
          <h3>Common failure modes</h3>
          <ul>
            {exercise.commonFailureModes.map((item) => (
              <li key={item}>{renderWithLinks(item)}</li>
            ))}
          </ul>
        </article>

        <article className="courseCard">
          <h3>Extension task (optional)</h3>
          <p>{renderWithLinks(exercise.extensionTask)}</p>
        </article>
      </section>
    </div>
  );
}
