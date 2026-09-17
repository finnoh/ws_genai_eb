import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function CourseAvailability(): ReactNode {
  return (
    <Layout title="Submissions and results" description="Exercise submissions and results will be available during the course on 13–14 May 2027.">
      <main className="container margin-vert--xl">
        <h1>Submissions and results</h1>
        <p>The next course takes place on <strong>13–14 May 2027</strong>.</p>
        <p>The submission forms and results sheets will be available then.</p>
        <p><Link to="/docs/live-exercises">Return to the exercises</Link></p>
      </main>
    </Layout>
  );
}
