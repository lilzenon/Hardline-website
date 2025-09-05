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
    criticalChunks = ['react-core', 'router', 'index'],
    prefetchChunks = ['figma-mobile', 'figma-desktop', 'about-page'],
    preloadFonts = true,
    preloadCriticalCSS = true
  } = options;

  return {
    name: 'preload-optimization',
    apply: 'build',
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
          
          // Find critical JavaScript chunks
          Object.keys(bundle).forEach(fileName => {
            const chunk = bundle[fileName];
            if (chunk.type === 'chunk') {
              const chunkName = chunk.name || fileName;
              
              // Preload critical chunks
              if (criticalChunks.some(critical => chunkName.includes(critical))) {
                preloadLinks.push(`<link rel="preload" href="/${fileName}" as="script" crossorigin>`);
              }
              
              // Prefetch non-critical chunks
              if (prefetchChunks.some(prefetch => chunkName.includes(prefetch))) {
                prefetchLinks.push(`<link rel="prefetch" href="/${fileName}" as="script" crossorigin>`);
              }
            }
          });
          
          // Add preload for critical CSS
          if (preloadCriticalCSS) {
            Object.keys(bundle).forEach(fileName => {
              if (fileName.endsWith('.css') && fileName.includes('index')) {
                preloadLinks.push(`<link rel="preload" href="/${fileName}" as="style">`);
              }
            });
          }
          
          // Add preload for fonts
          if (preloadFonts) {
            preloadLinks.push(`<link rel="preload" href="/fonts/nunito-variable.woff2" as="font" type="font/woff2" crossorigin>`);
          }
          
          // Insert preload links in head
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
