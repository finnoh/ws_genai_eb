import React, {useEffect, useMemo, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type Props = {
  src: string;
};

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
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    async function load(): Promise<void> {
      try {
        const res = await fetch(resolvedSrc);
        if (!res.ok) {
          return;
        }
        const text = await res.text();

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

        const merged = `${styleBlocks}<div>${bodyRoot.innerHTML}</div>`;
        if (!cancelled) {
          setHtml(merged);
        }
      } catch {
        if (!cancelled) {
          setHtml('');
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [baseDir, resolvedSrc]);

  if (!html) {
    return <p>Loading write-up...</p>;
  }

  return <div dangerouslySetInnerHTML={{__html: html}} />;
}
