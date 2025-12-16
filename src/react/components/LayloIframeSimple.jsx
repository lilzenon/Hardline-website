import React, { useEffect, useRef, useState, useCallback } from 'react';
import useLayloSDK from '../hooks/useLayloSDK';

/**
 * LayloIframeSimple
 * Laylo iframe embed that uses the shared useLayloSDK hook.
 * Ensures strict compatibility with Laylo's official embed code.
 */
const LayloIframeSimple = ({
  dropId,
  color = 'f60509',
  theme = 'dark',
  background = 'transparent',
  minimal = true,
  style = {},
  visible = true,
}) => {
  const [retryCount, setRetryCount] = useState(0);
  const isLayloReady = useLayloSDK(); // Use the shared hook
  const loadedRef = useRef(false);

  // Log callback for debugging
  const log = useCallback((msg, extra) => {
    if (process.env.NODE_ENV === 'development') {
      const ts = new Date().toISOString();
      // eslint-disable-next-line no-console
      console.log(`[LayloSimple ${ts}] ${msg}`, extra ?? '');
    }
  }, []);

  // Handle iframe load
  const handleLoad = useCallback(() => {
    log('Iframe onLoad fired');
    loadedRef.current = true;
  }, [log]);

  // Handle iframe error
  const handleError = useCallback(() => {
    log('Iframe onError');
    // Simple retry logic
    if (retryCount < 2) {
      setTimeout(() => setRetryCount(r => r + 1), 2000);
    }
  }, [retryCount, log]);

  // Build Layout URL
  const buildLayloUrl = useCallback(() => {
    if (!dropId) return null;
    let url = `https://embed.laylo.com?dropId=${dropId}&color=${color}&minimal=${minimal}&theme=${theme}&background=${background}`;
    if (retryCount > 0) {
      url += `&_retry=${retryCount}`;
    }
    return url;
  }, [dropId, color, theme, background, minimal, retryCount]);

  const iframeSrc = buildLayloUrl();

  // If invisible, missing dropId, or SDK not ready, render placeholder or null
  if (!dropId || !visible) {
    return <div style={{ ...style }} />;
  }

  // Show loading state or nothing while SDK loads?
  // User's snippet puts script and iframe together.
  // We wait for SDK to be ready to ensure reliability on Safari.
  if (!isLayloReady) {
    return <div style={{ ...style, minHeight: '1px' }} />;
  }

  // Exact attributes from user's request with React fixes
  // allowtransparency -> allowTransparency
  // frameborder -> frameBorder
  // style width: 1px min-width: 100%
  return (
    <iframe
      key={`laylo-${dropId}-${retryCount}`}
      id={`laylo-drop-${dropId}`}
      title="Laylo Signup"
      frameBorder="0"
      scrolling="no"
      allow="web-share"
      allowTransparency={true} // Fixed React prop casing
      onLoad={handleLoad}
      onError={handleError}
      style={{
        width: '1px',
        minWidth: '100%',
        maxWidth: '1000px',
        border: 'none',
        ...style,
      }}
      src={iframeSrc}
    />
  );
};

export default LayloIframeSimple;

