import React, {useEffect, useMemo, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type Submission = Record<string, string>;

const REFRESH_MS = 15000;
const MAX_ROWS = 12;

function normalizeRows(input: unknown): Submission[] {
  if (Array.isArray(input)) {
    return input.filter((row) => typeof row === 'object' && row !== null) as Submission[];
  }
  if (typeof input === 'object' && input !== null && 'submissions' in input) {
    const maybeRows = (input as {submissions?: unknown}).submissions;
    if (Array.isArray(maybeRows)) {
      return maybeRows.filter((row) => typeof row === 'object' && row !== null) as Submission[];
    }
  }
  return [];
}

function valueFor(row: Submission, keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (value && value.trim()) {
      return value.trim();
    }
  }
  return '';
}

export default function LiveResultsBoard(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  const endpoint =
    ((siteConfig.customFields?.liveResultsJsonUrl as string | undefined) || '').trim();

  const [rows, setRows] = useState<Submission[]>([]);
  const [status, setStatus] = useState<string>('Idle');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    if (!endpoint) {
      return;
    }

    let cancelled = false;

    async function loadRows(): Promise<void> {
      try {
        setStatus('Refreshing...');
        const response = await fetch(endpoint, {cache: 'no-store'});
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        if (!cancelled) {
          setRows(normalizeRows(data));
          setStatus('Live');
          setLastUpdated(new Date().toLocaleTimeString());
        }
      } catch (error) {
        if (!cancelled) {
          setStatus(`Fetch failed: ${String(error)}`);
        }
      }
    }

    loadRows();
    const timer = window.setInterval(loadRows, REFRESH_MS);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [endpoint]);

  const latestRows = useMemo(() => rows.slice(-MAX_ROWS).reverse(), [rows]);

  if (!endpoint) {
    return (
      <div>
        <p>
          Configure <code>liveResultsJsonUrl</code> in <code>website/docusaurus.config.ts</code>{' '}
          to enable the table.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p>
        Status: <strong>{status}</strong>
        {lastUpdated ? ` | Last update: ${lastUpdated}` : ''}
      </p>
      <div style={{overflowX: 'auto'}}>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Exercise</th>
              <th>Group</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {latestRows.map((row, index) => (
              <tr key={`${index}-${valueFor(row, ['Timestamp', 'timestamp'])}`}>
                <td>{valueFor(row, ['Timestamp', 'timestamp'])}</td>
                <td>{valueFor(row, ['exercise_id', 'exercise', 'Exercise ID'])}</td>
                <td>{valueFor(row, ['group_id', 'group', 'Group ID'])}</td>
                <td>{valueFor(row, ['answer', 'Answer'])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
