import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './ExerciseBlockPage.module.css';

import {
  canonicalRubricDimensions,
  canonicalTimebox,
  getExerciseById,
  type ExerciseId,
} from '@site/src/data/exercises';

type Props = {
  exerciseId: ExerciseId;
};

function withParam(url: string, key: string, value: string): string {
  const parsedUrl = new URL(url);
  parsedUrl.searchParams.set(key, value);
  return parsedUrl.toString();
}

export default function ExerciseBlockPage({exerciseId}: Props): React.ReactElement {
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
      <section className={`courseHero ${styles.hero}`}>
        <p className="courseKicker">
          {exercise.day} · {exercise.block}
        </p>
        <h1 className={styles.heroTitle}>
          {exercise.id} - {exercise.title}
        </h1>
        <p className="courseLead">{exercise.objective}</p>
      </section>

      <section className="courseGrid">
        <article className="courseCard">
          <h3>Inputs</h3>
          <ul>
            {exercise.inputs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="courseCard">
          <h3>Deliverable</h3>
          <p>{exercise.deliverable}</p>
          <h3 className={styles.subhead}>Timebox</h3>
          <ul>
            <li>Lecture: {canonicalTimebox.lectureMinutes} min</li>
            <li>Hands-on: {canonicalTimebox.handsOnMinutes} min</li>
            <li>Debrief: {canonicalTimebox.debriefMinutes} min</li>
          </ul>
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
                Direct prefilled form: <a href={submissionHref}>{exercise.id} submission link</a>
              </li>
            ) : (
              <li>Direct form unavailable until form settings are configured.</li>
            )}
          </ul>
        </article>

        <article className="courseCard">
          <h3>Evaluation rubric</h3>
          <ul>
            {canonicalRubricDimensions.map((item) => (
              <li key={item}>{item}</li>
            ))}
            {exercise.rubricSpecific.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="courseGrid">
        <article className="courseCard">
          <h3>Common failure modes</h3>
          <ul>
            {exercise.commonFailureModes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="courseCard">
          <h3>Extension task (optional)</h3>
          <p>{exercise.extensionTask}</p>
        </article>
      </section>
    </div>
  );
}
