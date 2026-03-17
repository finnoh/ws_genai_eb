import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type DeckLinkProps = {
  path: string;
  label: string;
};

export default function DeckLink({path, label}: DeckLinkProps): JSX.Element {
  const href = useBaseUrl(path);

  return <a href={href}>{label}</a>;
}
