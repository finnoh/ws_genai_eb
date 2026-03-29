import React from 'react';

import BlockDeckPreview from './BlockDeckPreview';
import DeckLink from './DeckLink';
import ExerciseBlockPage from './ExerciseBlockPage';
import BlockWriteupInline from './BlockWriteupInline';
import {
  getExerciseById,
} from '@site/src/data/exercises';
import {getBlockById, type BlockId} from '@site/src/data/blocks';

type Props = {
  blockId: BlockId;
};

function toWriteupPath(slidePath: string): string {
  const m = slidePath.match(/^\/slides\/blocks\/(day[12])\/(day[12]_block[1-6]\.html)$/);
  if (!m) {
    return '';
  }
  const day = m[1];
  const file = m[2];
  return `/slides/notes/${day}/slides/blocks/${day}/${file}`;
}

export default function BlockContentPage({blockId}: Props): React.ReactElement {
  const block = getBlockById(blockId);
  const exercise = getExerciseById(block.exerciseId);
  const writeupSrc = toWriteupPath(block.slidePath);

  return (
    <div>
      <section className="courseHero">
        <p className="courseKicker">
          {block.day} · {block.block}
        </p>
        <p className="courseLead">
          <strong>
            <DeckLink path={block.slidePath} label={block.title} />
          </strong>
        </p>
        <p>{block.objective}</p>
        <BlockDeckPreview slidePath={block.slidePath} />
      </section>

      {writeupSrc ? (
        <section>
          <h3>Block Write-up</h3>
          <BlockWriteupInline src={writeupSrc} />
        </section>
      ) : null}

      <ExerciseBlockPage exerciseId={exercise.id} embedded />
    </div>
  );
}
