import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import {blocks} from '@site/src/data/blocks';
import styles from './SlideDeckTimeline.module.css';

type DeckItem = {
  label: string;
  title: string;
  path: string;
};

const dayDecks: DeckItem[] = [
  {
    label: 'Day 1 full deck',
    title: 'AI Agents in Economics and Business Research - Day 1 Foundations',
    path: '/slides/day1_foundations.html',
  },
  {
    label: 'Day 2 full deck',
    title: 'AI Agents in Economics and Business Research - Day 2 Advanced',
    path: '/slides/day2_advanced.html',
  },
];

const blockDecks: DeckItem[] = blocks.map((block) => ({
  label: `${block.day} ${block.block}`,
  title: block.title,
  path: block.slidePath,
}));

const timelineDecks = [...dayDecks, ...blockDecks];

export default function SlideDeckTimeline(): React.ReactElement {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Slide deck timeline</h3>
      <p className={styles.lead}>Top-to-bottom quick access to all published workshop decks.</p>
      <ol className={styles.timeline}>
        {timelineDecks.map((deck) => (
          <TimelineItem key={`${deck.label}-${deck.path}`} deck={deck} />
        ))}
      </ol>
    </section>
  );
}

function TimelineItem({deck}: {deck: DeckItem}): React.ReactElement {
  const href = useBaseUrl(deck.path);

  return (
    <li className={styles.item}>
      <p className={styles.meta}>{deck.label}</p>
      <p className={styles.deck}>
        <a href={href} target="_blank" rel="noreferrer">
          {deck.title}
        </a>
      </p>
    </li>
  );
}
