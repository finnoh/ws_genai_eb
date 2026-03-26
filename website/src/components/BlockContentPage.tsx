import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import DeckLink from './DeckLink';
import {
  canonicalRubricDimensions,
  canonicalTimebox,
  getExerciseById,
} from '@site/src/data/exercises';
import {getBlockById, type BlockId} from '@site/src/data/blocks';

type Props = {
  blockId: BlockId;
};

function withParam(url: string, key: string, value: string): string {
  const parsedUrl = new URL(url);
  parsedUrl.searchParams.set(key, value);
  return parsedUrl.toString();
}

export default function BlockContentPage({blockId}: Props): React.ReactElement {
  const block = getBlockById(blockId);
  const exercise = block.exerciseId ? getExerciseById(block.exerciseId) : null;
  const {siteConfig} = useDocusaurusContext();
  const customFields = siteConfig.customFields || {};
  const formUrl = (customFields.googleFormUrl as string | undefined)?.trim() || '';
  const exerciseField =
    (customFields.googleFormExerciseField as string | undefined)?.trim() || '';
  const submissionHref =
    exercise && formUrl && exerciseField
      ? withParam(formUrl, `entry.${exerciseField}`, exercise.id)
      : '';
  const rubricItems = exercise
    ? [...canonicalRubricDimensions, ...exercise.rubricSpecific]
    : [...canonicalRubricDimensions, ...block.rubricSpecific];
  const extensionTask = exercise ? exercise.extensionTask : block.extensionTask;
  const inputs = exercise ? exercise.inputs : block.inputs;
  const deliverable = exercise ? exercise.deliverable : block.deliverable;

  return (
    <div>
      <section className="courseHero">
        <p className="courseKicker">
          {block.day} · {block.block}
        </p>
        <p className="courseLead">
          <strong>{block.title}</strong>
        </p>
        <p>{block.objective}</p>
      </section>

      <section className="courseGrid">
        <article className="courseCard">
          <h3>Slide deck</h3>
          <p>
            <DeckLink path={block.slidePath} label={`${block.id} deck`} />
          </p>
          <h3>Timebox</h3>
          <ul>
            <li>Lecture: {canonicalTimebox.lectureMinutes} minutes</li>
            <li>Hands-on: {canonicalTimebox.handsOnMinutes} minutes</li>
            <li>Debrief: {canonicalTimebox.debriefMinutes} minutes</li>
          </ul>
        </article>

        <article className="courseCard">
          <h3>Objective</h3>
          <p>{block.objective}</p>
          <h3>Lecture focus</h3>
          <ul>
            {block.lectureFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="courseGrid">
        <article className="courseCard">
          <h3>Inputs</h3>
          <ul>
            {inputs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Deliverable</h3>
          <p>{deliverable}</p>
          <h3>Micro artifact</h3>
          <p>{block.microArtifact}</p>
        </article>

        <article className="courseCard">
          <h3>Hands-on activity</h3>
          <p>{block.handsOnActivity}</p>
          <h3>Evaluation rubric</h3>
          <ul>
            {rubricItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="courseGrid">
        <article className="courseCard">
          <h3>Submission link</h3>
          {exercise ? (
            <ul>
              <li>
                Use the prefiltered launcher:{' '}
                <Link to={`/docs/live-exercises?exercise=${exercise.id}`}>{exercise.id} in Live Exercises</Link>
              </li>
              {submissionHref ? (
                <li>
                  Direct prefilled form: <a href={submissionHref}>{exercise.id} submission link</a>
                </li>
              ) : (
                <li>Direct form unavailable until form settings are configured.</li>
              )}
            </ul>
          ) : (
            <p>
              No form submission for this block. Share the micro artifact during debrief, then record outcomes in
              your team notes.
            </p>
          )}
          <h3>Extension task (optional)</h3>
          <p>{extensionTask}</p>
        </article>

        <article className="courseCard">
          <h3>Debrief prompts</h3>
          <ul>
            {block.debriefPrompts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="courseBand">
        <p>
          Need quick access? Open the <Link to="/docs/live-exercises">Live Exercises launcher</Link> and the{' '}
          <Link to="/docs/live-results">Live Results board</Link>.
        </p>
      </section>
    </div>
  );
}
