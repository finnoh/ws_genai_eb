import React, {useRef} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './BlockDeckPreview.module.css';

type Props = {
  slidePath: string;
  title: string;
}

export default function BlockDeckPreview({slidePath, title}: Props): React.ReactElement {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const src = useBaseUrl(slidePath);

  function openFullscreen(): void {
    const frame = frameRef.current;
    if (frame && frame.requestFullscreen) {
      void frame.requestFullscreen();
      return;
    }
    window.open(src, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.frameShell}>
        <button
          type="button"
          className={styles.fullscreenButton}
          onClick={openFullscreen}
          aria-label={`Open ${title} slide deck in full screen`}>
          Full screen
        </button>
        <iframe
          ref={frameRef}
          title={`${title} slide preview`}
          className={styles.frame}
          src={src}
          sandbox="allow-scripts allow-popups"
          loading="lazy"
          allow="fullscreen"
          allowFullScreen
        />
      </div>
      <p className={styles.meta}>Use arrow keys in-frame, or open full screen.</p>
    </div>
  );
}
