import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const day1Blocks = [
  {label: 'Course Kickoff: Why AI Agents Now', to: '/docs/content/day1-1'},
  {label: 'LLMs and AI Agents', to: '/docs/content/day1-2'},
  {label: 'Context', to: '/docs/content/day1-3'},
  {label: 'Tools 1', to: '/docs/content/day1-4'},
  {label: 'Tools 2', to: '/docs/content/day1-5'},
  {label: 'Memory', to: '/docs/content/day1-6'},
];

const day2Blocks = [
  {label: 'Ideation with AI Agents', to: '/docs/content/day2-1'},
  {label: 'AI in Data Collection', to: '/docs/content/day2-2'},
  {label: 'Literature Review', to: '/docs/content/day2-3'},
  {label: 'Rigorous Analysis with AI Agents', to: '/docs/content/day2-4'},
  {label: 'Research Workflows', to: '/docs/content/day2-5'},
  {label: 'Writing & Syndication', to: '/docs/content/day2-6'},
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description="AI agents for economics and business research">
      <main className={styles.page}>
        <section className={styles.heroShell}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Tinbergen Institute</p>
            <div className={styles.heroTextBox}>
              <h1>{siteConfig.title}</h1>
              <p className={styles.tagline}>
                <a href="https://tinbergen.nl/ai-agents-in-economics-and%20business-research" target="_blank" rel="noreferrer">
                  AI agents for economics and business research.
                </a>
              </p>
            </div>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} to="/docs/schedule">
                Open schedule 📅
              </Link>
              <Link className={styles.ghostAction} to="/docs/live-exercises">
                Open exercises ✏️
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.lowerLayout}>
          <Link className={styles.linkCard} to="/docs/live-exercises">
            <p className={styles.cardLabel}>Exercise pages</p>
            <h2>Exercises</h2>
            <p>Open live exercises.</p>
          </Link>

          <article className={styles.linkCard}>
            <p className={styles.cardLabel}>Day 1</p>
            <h2>Building AI Agents</h2>
            <ul>
              {day1Blocks.map((block) => (
                <li key={block.to}>
                  <Link to={block.to}>{block.label}</Link>
                </li>
              ))}
            </ul>
          </article>

          <article className={styles.linkCard}>
            <p className={styles.cardLabel}>Day 2</p>
            <h2>AI Agents in Research</h2>
            <ul>
              {day2Blocks.map((block) => (
                <li key={block.to}>
                  <Link to={block.to}>{block.label}</Link>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </Layout>
  );
}
