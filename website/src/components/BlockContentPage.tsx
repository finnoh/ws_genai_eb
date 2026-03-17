import React from 'react';
import Link from '@docusaurus/Link';

import DeckLink from './DeckLink';
import {canonicalTimebox} from '@site/src/data/exercises';
import {getBlockById, type BlockId} from '@site/src/data/blocks';

type Props = {
  blockId: BlockId;
};

export default function BlockContentPage({blockId}: Props): React.ReactElement {
  const block = getBlockById(blockId);

  return (
    <div>
      <section className="courseHero">
        <p className="courseKicker">
          {block.day} · {block.block}
        </p>
        <p className="courseLead">
          <strong>{block.title}</strong>
        </p>
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
          <h3>Hands-on activity</h3>
          <p>{block.handsOnActivity}</p>
          <h3>Micro artifact</h3>
          <p>{block.microArtifact}</p>
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

      {block.exerciseId ? (
        <section className="courseBand">
          <p>
            This block includes exercise <strong>{block.exerciseId}</strong>. Open{' '}
            <Link to={`/docs/live-exercises?exercise=${block.exerciseId}`}>the prefiltered launcher</Link> or go to the{' '}
            <Link to="/docs/live-exercises">full exercise list</Link>.
          </p>
        </section>
      ) : null}
    </div>
  );
}
