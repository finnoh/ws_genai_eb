import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

type DeckLinkProps = {
  path: string;
  label: string;
};

export default function DeckLink({path, label}: DeckLinkProps): React.ReactElement {
  const href = `${useBaseUrl(path)}#/title-slide`;

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  );
}
