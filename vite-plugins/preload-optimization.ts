/**
 * Vite Plugin: route-chunk and device-chunk preloading for the built HTML.
 *
 * Vite only emits <link rel="modulepreload"> for the ENTRY's static imports
 * (react-vendor). Everything the homepage actually renders sits two dynamic
 * imports deeper (main.tsx → HomePage → FigmaMobile | FigmaDesktop), so the
 * browser discovered those chunks one network round trip at a time. This plugin
 * closes that waterfall:
 *
 *   1. `criticalChunks` (HomePage) get a static <link rel="modulepreload"> plus
 *      one for each of their direct static deps not already in the HTML.
 *   2. `deviceChunks` (FigmaMobile / FigmaDesktop) are preloaded by a tiny
 *      inline script, in <head> before the entry module, that picks ONE branch at
 *      parse time with the same breakpoint/UA test the app uses. A static link
 *      for both would make phones download the desktop chunk too.
 *
 * Matching is by rollup's chunk `name` (case-sensitive, exact). The previous
 * version compared lower-case strings like 'figma-mobile' against file names
 * like 'FigmaMobile-abc.js' and therefore emitted nothing. It also emitted
 * preloads that were pure waste: an `as="script"` preload of the entry (already
 * the module <script>), an `as="style"` preload of index.css (which
 * scripts/inline-css.js inlines right after the build) and a second
 * inter-400.woff2 preload (index.html already has one). Those are gone.
 *
 * This hook must never fail the build: a missing chunk is logged and skipped.
 */

import type { Plugin } from 'vite';
import type { OutputBundle, OutputChunk } from 'rollup';

interface PreloadOptions {
  /** Rollup chunk names preloaded unconditionally (route chunk for the money page). */
  criticalChunks?: string[];
  /** Rollup chunk names preloaded for exactly one device class, chosen at parse time. */
  deviceChunks?: { mobile?: string; desktop?: string };
  /** Rollup chunk names to <link rel="prefetch"> at low priority (none by default). */
  prefetchChunks?: string[];
}

// Must equal MOBILE_BREAKPOINT in src/react/components/HomePage.jsx and the UA
// regex in src/utils/mobileOptimization.js (isMobileDevice). If these drift, the
// preloaded Figma chunk is not the one that renders and the preload is wasted.
const MOBILE_BREAKPOINT = 768;
const MOBILE_UA_REGEX_SOURCE = 'Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini';

/**
 * Find a chunk by rollup `name`. Falls back to a `<name>-<hash>.js` file-name
 * match for chunks whose name rollup rewrote (e.g. de-duplicated names).
 */
function findChunk(bundle: OutputBundle, name: string): OutputChunk | null {
  const chunks = Object.values(bundle).filter((o): o is OutputChunk => o.type === 'chunk');
  const byName = chunks.find((c) => c.name === name);
  if (byName) return byName;
  const prefix = `${name}-`;
  return chunks.find((c) => {
    const base = c.fileName.split('/').pop() || '';
    return base.startsWith(prefix) && base.endsWith('.js');
  }) || null;
}

/** The chunk plus its DIRECT static deps, as URLs, minus anything the HTML already references. */
function chunkUrls(chunk: OutputChunk, base: string, html: string): string[] {
  const files = [chunk.fileName, ...(chunk.imports || [])];
  const seen = new Set<string>();
  const urls: string[] = [];
  for (const fileName of files) {
    if (!fileName || seen.has(fileName)) continue;
    seen.add(fileName);
    // Already a <script type="module"> / modulepreload in the document (entry,
    // react-vendor) — a second hint for the same URL is noise.
    if (html.includes(fileName)) continue;
    urls.push(`${base}${fileName}`);
  }
  return urls;
}

/**
 * Inline <head> script that appends modulepreload links for ONE device branch.
 * Readable form of what is emitted (minified by hand below):
 *
 *   (function () {
 *     try {
 *       if (location.pathname !== '/' && location.pathname !== '/index.html') return; // only the homepage renders these
 *       var mobile = window.innerWidth <= 768 || /Mobile|Android|.../i.test(navigator.userAgent);
 *       var urls = mobile ? MOBILE_URLS : DESKTOP_URLS;
 *       var anchor = document.currentScript;
 *       for (var i = 0; i < urls.length; i++) {
 *         var l = document.createElement('link');
 *         l.rel = 'modulepreload';
 *         l.setAttribute('crossorigin', '');   // must match the entry <script crossorigin> credentials mode
 *         l.href = urls[i];
 *         anchor && anchor.parentNode ? anchor.parentNode.insertBefore(l, anchor) : document.head.appendChild(l);
 *       }
 *     } catch (e) {}
 *   })();
 *
 * The links are inserted before the entry module, at parse time, so Vite's
 * modulepreload polyfill (which scans existing links when the entry runs) also
 * covers browsers without native modulepreload.
 */
function deviceChunkScript(mobileUrls: string[], desktopUrls: string[]): string {
  const m = JSON.stringify(mobileUrls);
  const d = JSON.stringify(desktopUrls);
  return (
    '<script>' +
    '(function(){try{' +
    `if(location.pathname!=='/'&&location.pathname!=='/index.html')return;` +
    `var m=window.innerWidth<=${MOBILE_BREAKPOINT}||/${MOBILE_UA_REGEX_SOURCE}/i.test(navigator.userAgent);` +
    `var u=m?${m}:${d};var a=document.currentScript;` +
    `for(var i=0;i<u.length;i++){var l=document.createElement('link');l.rel='modulepreload';l.setAttribute('crossorigin','');l.href=u[i];` +
    `if(a&&a.parentNode){a.parentNode.insertBefore(l,a)}else{document.head.appendChild(l)}}` +
    '}catch(e){}})();' +
    '</script>'
  );
}

export function preloadOptimization(options: PreloadOptions = {}): Plugin {
  const {
    criticalChunks = ['HomePage'],
    deviceChunks = { mobile: 'FigmaMobile', desktop: 'FigmaDesktop' },
    prefetchChunks = []
  } = options;

  let base = '/';

  return {
    name: 'preload-optimization',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      // Respect a non-root `base` so hashed URLs resolve on sub-path deploys.
      base = config.base && config.base.endsWith('/') ? config.base : `${config.base || ''}/`;
    },
    generateBundle(_outputOptions, bundle) {
      try {
        const htmlFiles = Object.keys(bundle).filter((fileName) => fileName.endsWith('.html'));

        for (const htmlFileName of htmlFiles) {
          const htmlChunk = bundle[htmlFileName];
          if (!htmlChunk || htmlChunk.type !== 'asset' || typeof htmlChunk.source !== 'string') continue;

          let html = htmlChunk.source;
          const inserts: string[] = [];

          // 1. Unconditional modulepreload for route chunks (HomePage) + direct deps.
          for (const name of criticalChunks) {
            const chunk = findChunk(bundle, name);
            if (!chunk) {
              this.warn(`[preload-optimization] critical chunk "${name}" not found in bundle — skipped`);
              continue;
            }
            for (const url of chunkUrls(chunk, base, html)) {
              inserts.push(`<link rel="modulepreload" crossorigin href="${url}">`);
            }
          }

          // 2. Device-specific chunk, decided at parse time by an inline script.
          const mobileChunk = deviceChunks.mobile ? findChunk(bundle, deviceChunks.mobile) : null;
          const desktopChunk = deviceChunks.desktop ? findChunk(bundle, deviceChunks.desktop) : null;
          if (deviceChunks.mobile && !mobileChunk) {
            this.warn(`[preload-optimization] device chunk "${deviceChunks.mobile}" not found in bundle — skipped`);
          }
          if (deviceChunks.desktop && !desktopChunk) {
            this.warn(`[preload-optimization] device chunk "${deviceChunks.desktop}" not found in bundle — skipped`);
          }
          if (mobileChunk || desktopChunk) {
            // Deps shared with the critical chunks above are already preloaded
            // statically; strip them so a URL is hinted at most once.
            const alreadyStatic = new Set(inserts.map((tag) => (tag.match(/href="([^"]+)"/) || [])[1]));
            const dedupe = (urls: string[]) => urls.filter((u) => !alreadyStatic.has(u));
            const mobileUrls = mobileChunk ? dedupe(chunkUrls(mobileChunk, base, html)) : [];
            const desktopUrls = desktopChunk ? dedupe(chunkUrls(desktopChunk, base, html)) : [];
            if (mobileUrls.length || desktopUrls.length) {
              inserts.push(deviceChunkScript(mobileUrls, desktopUrls));
            }
          }

          // 3. Optional low-priority prefetches.
          for (const name of prefetchChunks) {
            const chunk = findChunk(bundle, name);
            if (!chunk) {
              this.warn(`[preload-optimization] prefetch chunk "${name}" not found in bundle — skipped`);
              continue;
            }
            inserts.push(`<link rel="prefetch" href="${base}${chunk.fileName}" as="script" crossorigin>`);
          }

          if (inserts.length === 0) continue;

          // Insert immediately BEFORE the entry <script type="module"> so the
          // hints are in the parser's hands no later than the entry itself.
          // Fall back to the end of <head> if Vite ever changes its markup.
          const body = `<!-- Route/device chunk preloads (vite-plugins/preload-optimization.ts) -->\n  ${inserts.join('\n  ')}`;
          const entryTag = html.search(/<script[^>]*type="module"[^>]*>/);
          const headClose = html.indexOf('</head>');
          if (entryTag !== -1) {
            // The entry tag is already indented; keep the same indentation for it.
            html = html.slice(0, entryTag) + `${body}\n  ` + html.slice(entryTag);
          } else if (headClose !== -1) {
            html = html.slice(0, headClose) + `\n  ${body}\n` + html.slice(headClose);
          } else {
            this.warn(`[preload-optimization] no <head> in ${htmlFileName} — skipped`);
            continue;
          }

          htmlChunk.source = html;
        }
      } catch (err) {
        // Preload hints are an optimisation; never fail the build over them.
        this.warn(`[preload-optimization] skipped: ${(err as Error)?.message || err}`);
      }
    }
  };
}
