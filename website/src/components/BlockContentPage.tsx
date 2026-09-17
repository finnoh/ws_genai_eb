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
  children?: React.ReactNode;
};

export default function BlockContentPage({blockId, children}: Props): React.ReactElement {
  const block = getBlockById(blockId);
  const exercise = getExerciseById(block.exerciseId);

  return (
    <div>
      <section className="courseHero">
        <p className="courseKicker">
          {block.day} · {block.block}
        </p>
        <h1 className="courseTitle">
          <DeckLink path={block.slidePath} label={block.title} />
        </h1>
        <p>{block.objective}</p>
        <BlockDeckPreview slidePath={block.slidePath} title={block.title} />
      </section>

      {children && (
        <aside className="courseBand" aria-label="Exercise guidance">
          {children}
        </aside>
      )}

      <ExerciseBlockPage exerciseId={exercise.id} embedded />
    </div>
  );
}
