import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const quickAccess = [
  {
    title: 'Live Exercises',
    description: 'Launch the active form with prefilled exercise context.',
    to: '/docs/live-exercises',
  },
  {
    title: 'Live Results',
    description: 'Review incoming submissions during debrief.',
    to: '/docs/live-results',
  },
  {
    title: 'Two-Day Schedule',
    description: 'See timing and block sequence at a glance.',
    to: '/docs/schedule',
  },
  {
    title: 'Materials Index',
    description: 'Open all reusable assets and references.',
    to: '/docs/materials-index',
  },
];

const highlights = [
  {
    label: 'Live cohorts',
    value: '2 days',
    note: 'Foundations + advanced system design',
  },
  {
    label: 'Exercise flow',
    value: 'E1-E8',
    note: 'Single-form submissions with live review',
  },
  {
    label: 'Teaching loop',
    value: '20/30/10',
    note: 'Lecture, build sprint, adversarial debrief',
  },
];

const pathways = [
  {
    title: 'Join Live Workshop',
    audience: 'For participants in this cohort',
    description:
      'Use one page as your operating panel for the full classroom loop: launch task, submit artifact, review debrief.',
    primaryLabel: 'Open Live Hub',
    primaryTo: '/docs/live-hub',
    secondaryLabel: 'Read Start Here',
    secondaryTo: '/docs/start-here',
    checkpoints: [
      'Launch the active exercise quickly',
      'Submit one group artifact per block',
      'Review outputs in the live debrief flow',
    ],
  },
  {
    title: 'Self-Study and Portfolio',
    audience: 'For visitors and after-class learners',
    description:
      'Follow a structured learning path, then reuse templates and examples to produce artifacts you can show publicly.',
    primaryLabel: 'Start Self-Study Track',
    primaryTo: '/docs/self-study',
    secondaryLabel: 'View Course Summary',
    secondaryTo: '/docs/public-course-summary',
    checkpoints: [
      'Follow the guided module sequence',
      'Use patterns and failure libraries',
      'Publish one reproducible portfolio artifact',
    ],
  },
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description="Companion website for AI agents workshop">
      <main className={styles.page}>
        <section className={styles.heroShell}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Tinbergen Institute</p>
            <h1>{siteConfig.title}</h1>
            <p className={styles.tagline}>{siteConfig.tagline}</p>
            <p className={styles.contextLine}>
              A practical course website for live classroom delivery, reproducible self-study,
              and rapid artifact review.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} to="/docs/live-hub">
                Open live hub
              </Link>
              <Link className={styles.ghostAction} to="/docs/self-study">
                Start self-study
              </Link>
            </div>
          </div>

          <div className={styles.heroPanel}>
            <p className={styles.panelLabel}>Course control panel</p>
            <div className={styles.metricRow}>
              {highlights.map((item) => (
                <article key={item.label} className={styles.metricCard}>
                  <p>{item.label}</p>
                  <strong>{item.value}</strong>
                  <span>{item.note}</span>
                </article>
              ))}
            </div>

            <article className={styles.miniTimeline}>
              <h2>This hour in class</h2>
              <ol>
                <li>Observe one concrete decision.</li>
                <li>Build one micro artifact.</li>
                <li>Verify with explicit evidence.</li>
              </ol>
              <Link className={styles.inlineLink} to="/docs/schedule">
                View full two-day schedule
              </Link>
            </article>
          </div>
        </section>

        <section className={styles.pathways}>
          {pathways.map((pathway) => (
            <article key={pathway.title} className={styles.pathwayCard}>
              <p className={styles.pathwayAudience}>{pathway.audience}</p>
              <h2>{pathway.title}</h2>
              <p>{pathway.description}</p>
              <ul className={styles.checkpoints}>
                {pathway.checkpoints.map((checkpoint) => (
                  <li key={checkpoint}>{checkpoint}</li>
                ))}
              </ul>
              <div className={styles.pathwayActions}>
                <Link className={styles.primaryAction} to={pathway.primaryTo}>
                  {pathway.primaryLabel}
                </Link>
                <Link className={styles.ghostAction} to={pathway.secondaryTo}>
                  {pathway.secondaryLabel}
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className={styles.linkGrid}>
          {quickAccess.map((item) => (
            <Link key={item.to} className={styles.linkCard} to={item.to}>
              <p className={styles.cardLabel}>Quick access</p>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span className={styles.cardAction}>Open section -&gt;</span>
            </Link>
          ))}
        </section>

        <section className={styles.proof}>
          <h2>Workshop operating loop</h2>
          <p>Observe -&gt; Build -&gt; Fail -&gt; Verify -&gt; Reflect</p>
          <div className={styles.pathwayActions}>
            <Link className={styles.ghostAction} to="/docs/overview">
              Read workshop overview
            </Link>
            <Link className={styles.ghostAction} to="/docs/run-this-workshop">
              Open instructor toolkit
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
