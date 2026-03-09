import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function ActiveFormLink(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  const formUrl = (siteConfig.customFields?.googleFormUrl as string | undefined) || '';

  if (!formUrl) {
    return (
      <p>
        Configure <code>GOOGLE_FORM_URL</code> for this site.
      </p>
    );
  }

  return (
    <p>
      <a href={formUrl} target="_blank" rel="noreferrer">
        Open active submission form
      </a>
    </p>
  );
}
