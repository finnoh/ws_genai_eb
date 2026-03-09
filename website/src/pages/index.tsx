import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/overview">
            Open Workshop Companion
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Companion website for AI agents workshop">
      <HomepageHeader />
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--4">
            <h3>Live Exercises</h3>
            <p>Launch exercise prompts and form links.</p>
            <Link className="button button--primary" to="/docs/live-exercises">
              Open
            </Link>
          </div>
          <div className="col col--4">
            <h3>Live Results</h3>
            <p>Review submissions together in class.</p>
            <Link className="button button--primary" to="/docs/live-results">
              Open
            </Link>
          </div>
          <div className="col col--4">
            <h3>Slides</h3>
            <p>Access day decks and teaching assets.</p>
            <Link className="button button--primary" to="/docs/slides-and-assets">
              Open
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
