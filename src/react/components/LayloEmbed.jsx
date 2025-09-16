import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLayloSDK } from '../hooks/useLayloSDK';

/**
 * Minimal, reliable Laylo embed using the exact iframe code
 * - No extra UI or styling added
 * - Ensures SDK is ready before rendering
 * - Invisible automatic retry on load failure/timeout
 */
export default function LayloEmbed({
  style,
  id = 'laylo-drop-c9ee71a5-2d3a-4da6-a528-eead61246989',
  src = 'https://embed.laylo.com?dropId=c9ee71a5-2d3a-4da6-a528-eead61246989&color=ff0000&minimal=true&theme=light&background=transparent&customTitle=Stay Updated',
  timeoutMs = 12000,
  maxRetries = 2,
}) {
  const { isReady } = useLayloSDK();
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef(null);
  const key = useMemo(() => `${id}-${attempt}`, [id, attempt]);

  useEffect(() => {
    if (!isReady) return;
    setLoaded(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (!loaded && attempt < maxRetries) {
        setAttempt((a) => a + 1);
      }
    }, timeoutMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isReady, attempt, loaded, timeoutMs, maxRetries]);

  if (!isReady) return null;

  return (
    <iframe
      key={key}
      id={id}
      frameBorder="0"
      scrolling="no"
      allow="web-share"
      allowTransparency="true"
      style={{ width: '1px', minWidth: '100%', maxWidth: '1000px', height: 'auto', border: 'none', ...style }}
      src={src}
      title="Stay updated with BOUNCE2BOUNCE"
      onLoad={() => {
        setLoaded(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }}
      onError={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (!loaded && attempt < maxRetries) setAttempt((a) => a + 1);
      }}
    />
  );
}

