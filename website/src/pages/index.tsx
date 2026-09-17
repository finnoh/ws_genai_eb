import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const curriculum = [
  {
    day: 'Day 1',
    date: 'May 13, 2027',
    dateTime: '2027-05-13',
    level: 'Beginner',
    title: 'AI Agents in Research',
    description: 'Explore where agents fit into the research process, from the first idea to the final manuscript.',
    blocks: [
      {label: 'Ideation with AI Agents', to: '/docs/content/day2-1'},
      {label: 'AI in Data Collection', to: '/docs/content/day2-2'},
      {label: 'Literature Review', to: '/docs/content/day2-3'},
      {label: 'Rigorous Analysis with AI Agents', to: '/docs/content/day2-4'},
      {label: 'Research Workflows', to: '/docs/content/day2-5'},
      {label: 'Writing & Syndication', to: '/docs/content/day2-6'},
    ],
  },
  {
    day: 'Day 2',
    date: 'May 14, 2027',
    dateTime: '2027-05-14',
    level: 'Advanced',
    title: 'Building AI Agents',
    description: 'Look inside an agent: how models, context, tools, and memory come together in a working system.',
    blocks: [
      {label: 'LLMs and AI Agents', to: '/docs/content/day1-2'},
      {label: 'Context', to: '/docs/content/day1-3'},
      {label: 'Tools 1', to: '/docs/content/day1-4'},
      {label: 'Tools 2', to: '/docs/content/day1-5'},
      {label: 'Memory', to: '/docs/content/day1-6'},
    ],
  },
];

function AgentWorkflow(): ReactNode {
  return (
    <figure className={styles.workflow}>
      <div className={styles.figureLabel} aria-hidden="true">
        <span>01 / Agent workflow</span>
        <span>Task → evidence</span>
      </div>
      <svg
        className={styles.workflowGraph}
        viewBox="0 0 460 340"
        role="img"
        aria-labelledby="workflow-title workflow-description">
        <title id="workflow-title">An agent workflow, guided by a researcher</title>
        <desc id="workflow-description">
          A user gives a task to an agent. Context and memory inform the agent.
          The agent uses tools to gather evidence, then checks that evidence in a feedback loop.
          The researcher remains responsible for judging the result.
        </desc>
        <defs>
          <marker id="workflow-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M1 1 L7 4 L1 7" className={styles.arrowHead} />
          </marker>
        </defs>
        <g className={styles.connections} markerEnd="url(#workflow-arrow)">
          <path d="M101 170 H172" />
          <path d="M222 70 V145" />
          <path d="M369 70 V102 H242 V145" />
          <path d="M272 170 H322" />
          <path d="M372 194 V265" />
          <path d="M322 289 H222 V195" />
        </g>
        <g className={styles.edgeLabels}>
          <text x="135" y="156">task</text>
          <text x="236" y="122" textAnchor="start">inform</text>
          <text x="297" y="156">act</text>
          <text x="385" y="234" textAnchor="start">gather</text>
          <text x="263" y="311">check &amp; refine</text>
        </g>
        <g className={styles.graphNode}>
          <rect x="172" y="22" width="100" height="48" rx="3" />
          <text x="222" y="51">Context</text>
          <rect x="319" y="22" width="100" height="48" rx="3" />
          <text x="369" y="51">Memory</text>
          <rect x="9" y="146" width="92" height="48" rx="3" />
          <text x="55" y="175">User</text>
          <rect x="322" y="146" width="100" height="48" rx="3" />
          <text x="372" y="175">Tools</text>
          <rect x="322" y="265" width="100" height="48" rx="3" />
          <text x="372" y="294">Evidence</text>
        </g>
        <g className={styles.agentNode}>
          <rect x="172" y="145" width="100" height="50" rx="3" />
          <text x="222" y="175">Agent</text>
        </g>
      </svg>
      <figcaption>
        A model is one part of the system. Context, tools, memory, and evidence shape what an agent can do.
      </figcaption>
    </figure>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description="A two-day Tinbergen Institute workshop on AI agents in economics and business research. May 13–14, 2027.">
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="workshop-title">
          <div className={styles.heroMeta}>
            <p className={styles.kicker}>Tinbergen Institute <span>/</span> Two-day workshop</p>
            <p className={styles.heroDate}>May 13–14, 2027</p>
          </div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 id="workshop-title" className={styles.heroTitle}>
                <span className={styles.titleMain}>AI Agents</span>
                <span className={styles.titleSubject}>in Economics &amp;<br />Business Research</span>
              </h1>
              <p className={styles.heroDescription}>
                From using agents in research to building them. Explore the workflows, tools,
                and decisions that connect AI systems to the work of a researcher.
              </p>
              <div className={styles.actions}>
                <Link className={styles.primaryAction} to="/docs/schedule">
                  View schedule <span aria-hidden="true">→</span>
                </Link>
                <Link className={styles.secondaryAction} to="/docs/live-exercises">
                  Open exercises <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <AgentWorkflow />
          </div>
        </section>

        <section className={styles.curriculum} aria-labelledby="curriculum-title">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>The curriculum</p>
            <h2 id="curriculum-title">Two days. From application to architecture.</h2>
          </div>
          <div className={styles.dayGrid}>
            {curriculum.map((day) => (
              <article className={styles.day} key={day.day}>
                <div className={styles.dayMeta}>
                  <span className={styles.dayNumber}>{day.day}</span>
                  <time dateTime={day.dateTime}>{day.date}</time>
                  <span className={styles.level}>{day.level}</span>
                </div>
                <h3>{day.title}</h3>
                <p className={styles.dayDescription}>{day.description}</p>
                <ol className={styles.sessionList}>
                  {day.blocks.map((block, index) => (
                    <li key={block.to}>
                      <Link to={block.to}>
                        <span className={styles.sessionNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                        <span>{block.label}</span>
                        <span className={styles.sessionArrow} aria-hidden="true">↗</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.approach} aria-labelledby="approach-title">
          <div>
            <p className={styles.kicker}>The approach</p>
            <h2 id="approach-title">Work with agents.<br />Keep your judgment.</h2>
          </div>
          <div className={styles.approachCopy}>
            <p>Use the exercises to put ideas into practice. Examine the evidence behind an output, check the work, and decide where human judgment is needed.</p>
            <Link to="/docs/live-exercises">Go to the exercises <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
