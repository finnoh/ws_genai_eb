import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

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
    <>
      <p>
        <strong>{exercise.day}</strong> - <strong>{exercise.block}</strong>
      </p>

      <h2>Objective</h2>
      <p>{exercise.objective}</p>

      <h2>Inputs</h2>
      <ul>
        {exercise.inputs.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Deliverable</h2>
      <p>{exercise.deliverable}</p>

      <h2>Timebox (20/30/10)</h2>
      <ul>
        <li>Lecture: {canonicalTimebox.lectureMinutes} minutes</li>
        <li>Hands-on: {canonicalTimebox.handsOnMinutes} minutes</li>
        <li>Debrief: {canonicalTimebox.debriefMinutes} minutes</li>
      </ul>

      <h2>Submission link (prefilled exercise_id)</h2>
      <ul>
        <li>
          Use the live launcher: <Link to={`/docs/live-exercises?exercise=${exercise.id}`}>Live Exercises</Link>
        </li>
        {submissionHref ? (
          <li>
            Direct prefilled form: <a href={submissionHref}>{exercise.id} submission link</a>
          </li>
        ) : (
          <li>Direct form unavailable until GOOGLE_FORM_URL and GOOGLE_FORM_EXERCISE_FIELD are configured.</li>
        )}
      </ul>

      <h2>Evaluation rubric</h2>
      <ul>
        {canonicalRubricDimensions.map((item) => (
          <li key={item}>{item}</li>
        ))}
        {exercise.rubricSpecific.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Common failure modes</h2>
      <ul>
        {exercise.commonFailureModes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Extension task (optional)</h2>
      <p>{exercise.extensionTask}</p>
    </>
  );
}
