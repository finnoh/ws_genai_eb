import React, {useEffect, useMemo, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Props = {
  src: string;
}

type LoadState =
  | {kind: 'loading'}
  | {kind: 'ready'; html: string}
  | {kind: 'unavailable'};

function dirname(path: string): string {
  const idx = path.lastIndexOf('/');
  return idx >= 0 ? path.slice(0, idx) : '';
}

function toAbsoluteAssetPath(value: string, baseDir: string): string {
  if (!value || /^(https?:|data:|mailto:|#|\/)/i.test(value)) {
    return value;
  }
  return `${baseDir}/${value}`.replace(/\/\/+/, '/');
}

export default function BlockWriteupInline({src}: Props): React.ReactElement {
  const resolvedSrc = useBaseUrl(src);
  const baseDir = useMemo(() => dirname(resolvedSrc), [resolvedSrc]);
  const [state, setState] = useState<LoadState>({kind: 'loading'});

  useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      setState({kind: 'loading'});
      try {
        const res = await fetch(resolvedSrc);
        if (!res.ok) {
          if (!cancelled) {
            setState({kind: 'unavailable'});
          }
          return;
        }
        const text = await res.text();
        if (!text.trim()) {
          if (!cancelled) {
            setState({kind: 'unavailable'});
          }
          return;
        }

        const styleBlocks = Array.from(text.matchAll(/<style[\s\S]*?<\/style>/gi))
          .map((m) => m[0])
          .join('\n');

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const bodyRoot = doc.body;

        bodyRoot.querySelectorAll('[src]').forEach((node) => {
          const src = node.getAttribute('src');
          if (src) {
            node.setAttribute('src', toAbsoluteAssetPath(src, baseDir));
          }
        });

        bodyRoot.querySelectorAll('[href]').forEach((node) => {
          const href = node.getAttribute('href');
          if (href) {
            node.setAttribute('href', toAbsoluteAssetPath(href, baseDir));
          }
        });

        bodyRoot.querySelectorAll('span.citation[data-cites]').forEach((node) => {
          const raw = node.textContent || '';
          if (!raw.includes('@')) {
            return;
          }
          const keys = (node.getAttribute('data-cites') || '')
            .split(/\s+/)
            .map((k) => k.trim())
            .filter(Boolean);
          if (keys.length === 0) {
            return;
          }
          const linked = keys
            .map((k) => `<a href="#ref-${k}">${k}</a>`)
            .join('; ');
          node.innerHTML = `[${linked}]`;
        });

        const bodyHtml = bodyRoot.innerHTML.trim();
        if (!bodyHtml) {
          if (!cancelled) {
            setState({kind: 'unavailable'});
          }
          return;
        }

        const merged = `${styleBlocks}<div>${bodyHtml}</div>`;
        if (!cancelled) {
          setState({kind: 'ready', html: merged});
        }
      } catch {
        if (!cancelled) {
          setState({kind: 'unavailable'});
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [baseDir, resolvedSrc]);

  if (state.kind === 'loading') {
    return <p role="status">Loading write-up...</p>;
  }

  if (state.kind === 'unavailable') {
    return <p className="writeupUnavailable">This block write-up is unavailable.</p>;
  }

  return <div dangerouslySetInnerHTML={{__html: state.html}} />;
}
