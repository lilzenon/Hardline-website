/**
 * Vite Plugin for Advanced Preload and Prefetch Optimization
 * Automatically adds resource hints for critical assets
 */

import type { Plugin } from 'vite';

interface PreloadOptions {
  criticalChunks?: string[];
  prefetchChunks?: string[];
  preloadFonts?: boolean;
  preloadCriticalCSS?: boolean;
}

export function preloadOptimization(options: PreloadOptions = {}): Plugin {
  const {
    criticalChunks = ['index', 'react-vendor'],
    prefetchChunks = ['FigmaMobile', 'FigmaDesktop', 'query', 'animations', 'icons', 'ui-vendor'],
    preloadFonts = true,
    preloadCriticalCSS = true
  } = options;

  return {
    name: 'preload-optimization',
    apply: 'build',
    enforce: 'post',
    generateBundle(options, bundle) {

      // Find the main HTML file
      const htmlFiles = Object.keys(bundle).filter(fileName => fileName.endsWith('.html'));

      htmlFiles.forEach(htmlFileName => {
        const htmlChunk = bundle[htmlFileName];
        if (htmlChunk.type === 'asset' && typeof htmlChunk.source === 'string') {
          let html = htmlChunk.source;

          // Add preload links for critical chunks
          const preloadLinks: string[] = [];
          const prefetchLinks: string[] = [];

          Object.keys(bundle).forEach(fileName => {
            if (fileName.endsWith('.js')) {
              const chunkName = fileName.split('/').pop()?.split('.')[0] || '';

              if (criticalChunks.some(critical => chunkName.includes(critical))) {
                preloadLinks.push(`<link rel="preload" href="/${fileName}" as="script" crossorigin>`);
              }

              if (prefetchChunks.some(prefetch => chunkName.includes(prefetch))) {
                prefetchLinks.push(`<link rel="prefetch" href="/${fileName}" as="script" crossorigin>`);
              }
            }
          });

          if (preloadCriticalCSS) {
            Object.keys(bundle).forEach(fileName => {
              if (fileName.endsWith('.css') && fileName.includes('index')) {
                preloadLinks.push(`<link rel="preload" href="/${fileName}" as="style">`);
              }
            });
          }

          if (preloadFonts) {
            preloadLinks.push(`<link rel="preload" href="/fonts/inter-400.woff2" as="font" type="font/woff2" crossorigin>`);
          }

          const headCloseIndex = html.indexOf('</head>');
          if (headCloseIndex !== -1) {
            const allLinks = [
              '  <!-- Critical Resource Preloads -->',
              ...preloadLinks.map(link => `  ${link}`),
              '  <!-- Non-Critical Resource Prefetches -->',
              ...prefetchLinks.map(link => `  ${link}`),
              ''
            ].join('\n');

            html = html.slice(0, headCloseIndex) + allLinks + html.slice(headCloseIndex);
          }

          htmlChunk.source = html;
        }
      });
    }
  };
}
