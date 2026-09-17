import React from 'react';

import BlockDeckPreview from './BlockDeckPreview';
import DeckLink from './DeckLink';
import ExerciseBlockPage from './ExerciseBlockPage';
import {
  getExerciseById,
} from '@site/src/data/exercises';
import {getBlockById, type BlockId} from '@site/src/data/blocks';

type Props = {
  blockId: BlockId;
};

export default function BlockContentPage({blockId}: Props): React.ReactElement {
  const block = getBlockById(blockId);
  const exercise = getExerciseById(block.exerciseId);

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
        <BlockDeckPreview slidePath={block.slidePath} title={block.title} />
      </section>

      <ExerciseBlockPage exerciseId={exercise.id} embedded />
    </div>
  );
}
