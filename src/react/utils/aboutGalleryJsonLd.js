// Shared helper for injecting About page gallery ImageObject JSON-LD
// Used by both desktop and mobile About page components

export const ABOUT_GALLERY_SCRIPT_ID = 'ld-json-about-gallery';

/**
 * Injects ImageObject JSON-LD for About page gallery images.
 *
 * @param {Array<any>} galleryImages Array of normalized gallery image objects
 */
export function injectAboutGalleryJsonLd(galleryImages) {
  try {
    const scriptId = ABOUT_GALLERY_SCRIPT_ID;

    if (!Array.isArray(galleryImages) || galleryImages.length === 0) {
      const existingEmpty = document.getElementById(scriptId);
      if (existingEmpty) existingEmpty.remove();
      return;
    }

    const siteUrl = 'https://bounce2bounce.com';
    const maxImages = 12; // Limit to keep JSON-LD compact

    const truncate = (value, maxLength) => {
      if (!value) return undefined;
      if (value.length <= maxLength) return value;
      return `${value.slice(0, maxLength - 1)}…`;
    };

    const imageObjects = galleryImages
      .slice(0, maxImages)
      .map((img, index) => {
        const uuid = img && img.uuid;
        let canonicalUrl = '';

        if (uuid) {
          // Prefer canonical public domain for image URLs
          canonicalUrl = `${siteUrl}/api/images/serve/${uuid}/large`;
        } else {
          const candidate =
            (img && img.urls && (img.urls.large || img.urls.medium || img.urls.original)) ||
            img?.url ||
            img?.src ||
            '';

          if (candidate) {
            if (/^https?:\/\//i.test(candidate)) {
              // Rewrite any admin or non-canonical host to bounce2bounce.com
              canonicalUrl = candidate.replace(/^https?:\/\/[^/]+/i, siteUrl);
            } else if (candidate.startsWith('/')) {
              canonicalUrl = `${siteUrl}${candidate}`;
            } else {
              canonicalUrl = `${siteUrl}/${candidate}`;
            }
          }
        }

        if (!canonicalUrl) return null;

        const rawAlt = img?.alt || img?.title || img?.description || 'Gallery image';
        const name = truncate(img?.title || rawAlt, 120);
        const description = truncate(img?.description || rawAlt, 160);

        const imageObject = {
          '@type': 'ImageObject',
          '@id': `${canonicalUrl}#about-gallery-${index + 1}`,
          contentUrl: canonicalUrl,
          url: canonicalUrl,
          caption: rawAlt
        };

        if (name) imageObject.name = name;
        if (description) imageObject.description = description;
        if (img && img.width && img.height) {
          imageObject.width = img.width;
          imageObject.height = img.height;
        }
        if (img && img.creator_name) {
          imageObject.creator = {
            '@type': 'Person',
            name: img.creator_name
          };
        }
        if (img && img.credit_text) {
          imageObject.creditText = img.credit_text;
        }
        if (img && img.copyright_notice) {
          imageObject.copyrightNotice = img.copyright_notice;
        }
        if (img && img.license_url) {
          imageObject.license = img.license_url;
        }
        if (img && img.acquire_license_page_url) {
          imageObject.acquireLicensePage = img.acquire_license_page_url;
        }

        return imageObject;
      })
      .filter(Boolean);

    if (!imageObjects.length) {
      const existingNone = document.getElementById(scriptId);
      if (existingNone) existingNone.remove();
      return;
    }

    const ld = {
      '@context': 'https://schema.org',
      '@graph': imageObjects
    };

    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);
  } catch (error) {
    // Fail silently for SEO helpers to avoid impacting user experience
    // eslint-disable-next-line no-console
    console.error('❌ Error generating About gallery JSON-LD:', error);
  }
}

/**
 * Removes the About gallery ImageObject JSON-LD script from the document head.
 */
export function removeAboutGalleryJsonLd() {
  const node = document.getElementById(ABOUT_GALLERY_SCRIPT_ID);
  if (node) node.remove();
}

