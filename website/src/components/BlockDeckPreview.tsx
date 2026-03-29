import React, {useMemo, useRef} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './BlockDeckPreview.module.css';

type Props = {
  slidePath: string;
};

const firstSlideIndex = 0;

export default function BlockDeckPreview({slidePath}: Props): React.ReactElement {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const baseDeckUrl = useBaseUrl(slidePath);
  const src = useMemo(() => `${baseDeckUrl}#/${firstSlideIndex}`, [baseDeckUrl]);

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
        <button type="button" className={styles.fullscreenButton} onClick={openFullscreen}>
          Full screen
        </button>
        <iframe
          ref={frameRef}
          title="Slide preview"
          className={styles.frame}
          src={src}
          loading="lazy"
          allow="fullscreen"
          allowFullScreen
        />
      </div>
      <p className={styles.meta}>Use arrow keys in-frame, or open full screen.</p>
    </div>
  );
}
