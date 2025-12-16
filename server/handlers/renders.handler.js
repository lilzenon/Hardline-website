const query = require("../queries");
const utils = require("../utils");
const env = require("../env");

/**
 *
 * PAGES
 *
 **/

async function homepage(req, res) {
    if (env.DISALLOW_ANONYMOUS_LINKS && !req.user) {
        res.redirect("/admin/login");
        return;
    }

    let events = [];
    if (req.user) {
        // Load user's events for the homepage
        events = await query.event.findByUserWithStats(req.user.id, { limit: 6 });
    }

    res.render("homepage", {
        title: "Free modern URL shortener",
        events: events,
        domain: env.DEFAULT_DOMAIN
    });
}

// REMOVED: modernHomepage function - unused legacy Handlebars renderer

// Old login functions removed - now using React-based admin login

function logout(req, res) {
    console.log(`🚪 User logging out: ${req.user?.email || 'unknown'}`);

    // Clear authentication token
    utils.deleteCurrentToken(res);

    // Clear session data including returnTo
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error('❌ Error destroying session during logout:', err);
            } else {
                console.log('✅ Session destroyed successfully');
            }
        });
    }

    // Clear any cached user data
    req.user = null;
    res.locals.user = null;
    res.locals.isAdmin = false;

    console.log('✅ Logout completed successfully');

    res.render("logout", {
        title: "Logging out.."
    });
}

async function createAdmin(req, res) {
    const isThereAUser = await query.user.findAny();
    if (isThereAUser) {
        res.redirect("/admin/login");
        return;
    }
    res.render("create_admin", {
        title: "Create admin account"
    });
}

// REMOVED: notFound function - 404 pages now handled by React SPA routing

function settings(req, res) {
    res.render("settings", {
        title: "Settings"
    });
}

function admin(req, res) {
    res.render("admin", {
        title: "Admin"
    });
}

function stats(req, res) {
    res.render("stats", {
        title: "Stats"
    });
}

async function banned(req, res) {
    res.render("banned", {
        title: "Banned link",
    });
}



async function resetPassword(req, res) {
    res.render("reset_password", {
        title: "Reset password",
    });
}

async function home(req, res) {
    try {
        // Fetch home page settings from database
        const homeSettings = await query.homeSettings.get();

        // Fetch featured drops for homepage display
        const featuredEvents = await query.event.getFeaturedEvents({ limit: 6 });

        // 🚀 DEBUG: Log detailed information about featured drops
        console.log(`🏠 Homepage loading...`);
        console.log(`📊 Home settings:`, {
            event_title: homeSettings.event_title,
            artist_name: homeSettings.artist_name,
            event_date: homeSettings.event_date
        });
        console.log(`🎯 Featured events query result:`, {
            count: featuredEvents.length,
            events: featuredEvents.map(event => ({
                id: event.id,
                title: event.title,
                show_on_homepage: event.show_on_homepage,
                is_active: event.is_active
            }))
        });

        // If no featured events, let's check if there are any events at all
        if (featuredEvents.length === 0) {
            console.log(`⚠️ No featured events found. Checking all events...`);
            try {
                const allEvents = await query.event.find({});
                console.log(`📋 Total events in database: ${allEvents.length}`);
                const eventsWithHomepage = allEvents.filter(event => event.show_on_homepage);
                console.log(`🏠 Events with show_on_homepage=true: ${eventsWithHomepage.length}`);
                const activeEvents = allEvents.filter(event => event.is_active);
                console.log(`✅ Active events: ${activeEvents.length}`);
            } catch (debugError) {
                console.error(`❌ Debug query failed:`, debugError);
            }
        }

        // Format the date for display
        let formattedDate = "March 29th, 9:00 P.M.";
        if (homeSettings.event_date) {
            const eventDate = new Date(homeSettings.event_date);
            const options = {
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            };
            formattedDate = eventDate.toLocaleDateString('en-US', options)
                .replace(',', 'th,'); // Add 'th' suffix
        }

        console.log(`🏠 Homepage loaded with ${featuredEvents.length} featured events`);

        res.render("home", {
            layout: "layouts/home",
            title: "BOUNCE2BOUNCE - Home",
            homeSettings: homeSettings,
            featuredEvents: featuredEvents,
            formattedDate: formattedDate,
            isPreview: req.query.preview === 'true',
            timestamp: Date.now()
        });
    } catch (error) {
        console.error("Error rendering home page:", error);

        // Fallback to default values if database fails
        const defaultSettings = {
            event_title: "EVENT TITLE",
            artist_name: "Artist Name",
            event_address: "101 Address Drive, Asbury Park, NJ",
            event_image: null,
            tickets_url: null,
            instagram_url: null,
            tiktok_url: null,
            twitter_url: null,
            email_url: null
        };

        res.render("home", {
            layout: "layouts/home",
            title: "BOUNCE2BOUNCE - Home",
            homeSettings: defaultSettings,
            featuredEvents: [], // Empty array for fallback
            formattedDate: "March 29th, 9:00 P.M.",
            isPreview: req.query.preview === 'true',
            timestamp: Date.now()
        });
    }
}

async function homeEditor(req, res) {
    try {
        // Get current home settings for the form
        const homeSettings = await query.homeSettings.getForAdmin();

        res.render("home-editor", {
            title: "Home Editor",
            pageTitle: "Home Editor",
            layout: "layouts/modern-dashboard",
            currentPage: "home-editor",
            homeSettings: homeSettings
        });
    } catch (error) {
        console.error("Error loading home editor:", error);
        res.render("home-editor", {
            title: "Home Editor",
            pageTitle: "Home Editor",
            layout: "layouts/modern-dashboard",
            currentPage: "home-editor",
            homeSettings: {}
        });
    }
}

async function resetPasswordSetNewPassword(req, res) {
    const reset_password_token = req.params.resetPasswordToken;

    if (reset_password_token) {
        const user = await query.user.find({
            reset_password_token,
            reset_password_expires: [">", utils.dateToUTC(new Date())]
        });
        if (user) {
            res.locals.token_verified = true;
        }
    }


    res.render("reset_password_set_new_password", {
        title: "Reset password",
        ...(res.locals.token_verified && { reset_password_token }),
    });
}

async function verifyChangeEmail(req, res) {
    res.render("verify_change_email", {
        title: "Verifying email",
    });
}

async function verify(req, res) {
    res.render("verify", {
        title: "Verify",
    });
}

async function terms(req, res) {
    res.render("terms", {
        title: "Terms of Service",
    });
}

/**
 *
 * PARTIALS
 *
 **/

async function confirmLinkDelete(req, res) {
    const link = await query.link.find({
        uuid: req.query.id,
        ...(!req.user.admin && { user_id: req.user.id })
    });
    if (!link) {
        return res.render("partials/links/dialog/message", {
            layout: false,
            message: "Could not find the link."
        });
    }
    res.render("partials/links/dialog/delete", {
        layout: false,
        link: utils.getShortURL(link.address, link.domain).link,
        id: link.uuid
    });
}

async function confirmLinkBan(req, res) {
    const link = await query.link.find({
        uuid: req.query.id,
        ...(!req.user.admin && { user_id: req.user.id })
    });
    if (!link) {
        return res.render("partials/links/dialog/message", {
            message: "Could not find the link."
        });
    }
    res.render("partials/links/dialog/ban", {
        link: utils.getShortURL(link.address, link.domain).link,
        id: link.uuid
    });
}

async function confirmUserDelete(req, res) {
    const user = await query.user.find({ id: req.query.id });
    if (!user) {
        return res.render("partials/admin/dialog/message", {
            layout: false,
            message: "Could not find the user."
        });
    }
    res.render("partials/admin/dialog/delete_user", {
        layout: false,
        email: user.email,
        id: user.id
    });
}

async function confirmUserBan(req, res) {
    const user = await query.user.find({ id: req.query.id });
    if (!user) {
        return res.render("partials/admin/dialog/message", {
            layout: false,
            message: "Could not find the user."
        });
    }
    res.render("partials/admin/dialog/ban_user", {
        layout: false,
        email: user.email,
        id: user.id
    });
}

async function createUser(req, res) {
    res.render("partials/admin/dialog/create_user", {
        layout: false,
    });
}

async function addDomainAdmin(req, res) {
    res.render("partials/admin/dialog/add_domain", {
        layout: false,
    });
}

async function addDomainForm(req, res) {
    res.render("partials/settings/domain/add_form");
}

async function confirmDomainDelete(req, res) {
    const domain = await query.domain.find({
        uuid: req.query.id,
        user_id: req.user.id
    });
    if (!domain) {
        throw new utils.CustomError("Could not find the domain.", 400);
    }
    res.render("partials/settings/domain/delete", {
        ...utils.sanitize.domain(domain)
    });
}

async function confirmDomainBan(req, res) {
    const domain = await query.domain.find({
        id: req.query.id
    });
    if (!domain) {
        throw new utils.CustomError("Could not find the domain.", 400);
    }
    const hasUser = !!domain.user_id;
    const hasLink = await query.link.find({ domain_id: domain.id });
    res.render("partials/admin/dialog/ban_domain", {
        id: domain.id,
        address: domain.address,
        hasUser,
        hasLink,
    });
}

async function confirmDomainDeleteAdmin(req, res) {
    const domain = await query.domain.find({
        id: req.query.id
    });
    if (!domain) {
        throw new utils.CustomError("Could not find the domain.", 400);
    }
    const hasLink = await query.link.find({ domain_id: domain.id });
    res.render("partials/admin/dialog/delete_domain", {
        id: domain.id,
        address: domain.address,
        hasLink,
    });
}



async function getSupportEmail(req, res) {
    if (!env.CONTACT_EMAIL) {
        throw new utils.CustomError("No support email is available.", 400);
    }
    await utils.sleep(500);
    res.render("partials/support_email", {
        email: env.CONTACT_EMAIL,
    });
}

async function linkEdit(req, res) {
    const link = await query.link.find({
        uuid: req.params.id,
        ...(!req.user.admin && { user_id: req.user.id })
    });
    res.render("partials/links/edit", {
        ...(link && utils.sanitize.link_html(link)),
        domain: link.domain || env.DEFAULT_DOMAIN,
    });
}

async function linkEditAdmin(req, res) {
    const link = await query.link.find({
        uuid: req.params.id,
    });
    res.render("partials/admin/links/edit", {
        ...(link && utils.sanitize.link_html(link)),
        domain: link.domain || env.DEFAULT_DOMAIN,
    });
}

async function eventEdit(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const event = await query.event.findOne({ id, user_id: userId });

        if (!event) {
            return res.status(404).render("404", {
                message: "Event not found"
            });
        }



        res.render("modern-event-edit", {
            title: `Edit ${event.title}`,
            pageTitle: `Edit ${event.title}`,
            layout: "layouts/modern-dashboard",
            currentPage: "event-edit", // Changed from "events" to prevent modal inclusion
            user: req.user,
            event: event,
            domain: env.DEFAULT_DOMAIN
        });
    } catch (error) {
        console.error("Error loading event edit page:", error);
        res.status(500).render("404", {
            message: "Error loading event"
        });
    }
}

// Helper function to generate static HTML content for bots (Googlebot, Instagram, etc.)
// 🤖 BOT-FRIENDLY RENDERING: All pages now get server-side rendered content
// This prevents soft 404 errors and ensures bots can index page content
function generateStaticContent(pageType, metaTags, seoSettings, pageData = null) {
    // Local escapeHtml function for this scope
    const escapeHtml = (text) => {
        if (!text) return '';
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    const baseStyles = `
        min-height: 100vh;
        background: #000000;
        color: #ffffff;
        font-family: Inter, system-ui, sans-serif;
        padding: 2rem 1rem;
    `;

    const containerStyles = `
        max-width: 800px;
        margin: 0 auto;
    `;

    const titleStyles = `
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        text-align: center;
    `;

    const descriptionStyles = `
        font-size: 1.125rem;
        color: #e5e5e5;
        margin-bottom: 2rem;
        text-align: center;
    `;

    // FAQ Page: Render FAQ questions and answers
    if (pageType === 'faq') {
        // ✅ SEO FIX: Always render FAQ page structure, even if no FAQ items loaded
        // This prevents soft 404 errors when API is slow or fails
        let faqItemsHtml = '';

        if (pageData && pageData.length > 0) {
            faqItemsHtml = pageData.map((faq) => `
                <div style="margin-bottom: 1rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden;">
                    <div style="padding: 1.25rem; background: rgba(22,22,22,0.8);">
                        <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600; color: #ffffff;">
                            ${faq.question || faq.q || ''}
                        </h3>
                    </div>
                    <div style="padding: 1.25rem; background: rgba(22,22,22,0.5); color: #e5e5e5; line-height: 1.75;">
                        ${faq.answer_html || faq.aHtml || faq.answer || faq.a || ''}
                    </div>
                </div>
            `).join('');
        } else {
            // Fallback content if FAQ data is not available
            faqItemsHtml = `
                <div style="padding: 2rem; text-align: center; color: rgba(255,255,255,0.7);">
                    <p>FAQ content is loading. Please enable JavaScript for the full interactive experience.</p>
                </div>
            `;
        }

        return `
            <div style="${baseStyles}">
                <div style="${containerStyles}">
                    <h1 style="${titleStyles}">${metaTags.title || 'Frequently Asked Questions'}</h1>
                    <p style="${descriptionStyles}">${metaTags.description || 'Find answers to common questions about BOUNCE2BOUNCE events.'}</p>
                    <div style="margin-top: 2rem;">${faqItemsHtml}</div>
                </div>
            </div>
        `;
    }

    // About Page: Render about content AND gallery images for Google Image SEO
    if (pageType === 'about' && pageData) {
        // 🖼️ GOOGLE IMAGE SEO FIX: Render gallery images as actual <img> tags for bot indexing
        // This is CRITICAL - Google Images indexes images from <img> tags, not just structured data
        let galleryHtml = '';
        if (pageData.galleryImages && Array.isArray(pageData.galleryImages) && pageData.galleryImages.length > 0) {
            const imageBaseUrl = 'https://admin.b2b.click';
            const galleryImagesHtml = pageData.galleryImages.map((image, index) => {
                // Get the best available image URL
                const imageUrl = image.urls?.large || image.urls?.medium || image.url || image.src || '';
                const absoluteImageUrl = imageUrl.startsWith('http') ? imageUrl : `${imageBaseUrl}${imageUrl}`;

                // Get alt text with proper fallbacks
                const altText = escapeHtml(image.alt || image.title || image.description || `BOUNCE2BOUNCE Gallery Image ${index + 1}`);
                const titleText = escapeHtml(image.title || image.alt || `Gallery Image ${index + 1}`);

                // Build srcset for responsive images
                const thumbnailUrl = image.urls?.thumbnail ? (image.urls.thumbnail.startsWith('http') ? image.urls.thumbnail : `${imageBaseUrl}${image.urls.thumbnail}`) : '';
                const smallUrl = image.urls?.small ? (image.urls.small.startsWith('http') ? image.urls.small : `${imageBaseUrl}${image.urls.small}`) : '';
                const mediumUrl = image.urls?.medium ? (image.urls.medium.startsWith('http') ? image.urls.medium : `${imageBaseUrl}${image.urls.medium}`) : '';
                const largeUrl = image.urls?.large ? (image.urls.large.startsWith('http') ? image.urls.large : `${imageBaseUrl}${image.urls.large}`) : '';

                let srcset = '';
                if (thumbnailUrl) srcset += `${thumbnailUrl} 200w, `;
                if (smallUrl) srcset += `${smallUrl} 400w, `;
                if (mediumUrl) srcset += `${mediumUrl} 800w, `;
                if (largeUrl) srcset += `${largeUrl} 1200w`;
                srcset = srcset.replace(/, $/, ''); // Remove trailing comma

                return `
                    <figure style="margin: 0 0 1rem 0; break-inside: avoid;">
                        <img
                            src="${absoluteImageUrl}"
                            alt="${altText}"
                            title="${titleText}"
                            ${srcset ? `srcset="${srcset}"` : ''}
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            style="width: 100%; height: auto; border-radius: 8px; display: block;"
                            loading="eager"
                            decoding="async"
                        >
                        ${image.title ? `<figcaption style="font-size: 0.875rem; color: #a0a0a0; margin-top: 0.5rem; text-align: center;">${escapeHtml(image.title)}</figcaption>` : ''}
                    </figure>
                `;
            }).join('');

            galleryHtml = `
                <section style="margin-top: 3rem;">
                    <h2 style="font-size: 2rem; font-weight: 600; margin-bottom: 1.5rem; text-align: center; color: #ffffff;">Gallery</h2>
                    <div style="column-count: 2; column-gap: 1rem;">
                        ${galleryImagesHtml}
                    </div>
                </section>
            `;
            console.log(`✅ SSR: Rendered ${pageData.galleryImages.length} gallery images as <img> tags for Google indexing`);
        }

        return `
            <div style="${baseStyles}">
                <div style="${containerStyles}">
                    <h1 style="${titleStyles}">${metaTags.title || 'About BOUNCE2BOUNCE'}</h1>
                    <p style="${descriptionStyles}">${metaTags.description || 'Learn about our mission and values.'}</p>
                    <div style="margin-top: 2rem; line-height: 1.75; color: #e5e5e5;">
                        ${pageData.content || ''}
                    </div>
                    ${galleryHtml}
                </div>
            </div>
        `;
    }

    // Homepage: Render event listings
    if (pageType === 'homepage' && pageData && pageData.events && pageData.events.length > 0) {
        const eventsHtml = pageData.events.slice(0, 6).map((event) => `
            <div style="margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; overflow: hidden; background: rgba(22,22,22,0.8);">
                ${event.cover_image_url ? `
                    <img src="${event.cover_image_url}" alt="${event.title || 'Event'}" style="width: 100%; height: 200px; object-fit: cover;">
                ` : ''}
                <div style="padding: 1.5rem;">
                    <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600; color: #ffffff;">
                        ${event.title || 'Untitled Event'}
                    </h3>
                    ${event.event_date_local ? `
                        <p style="margin: 0.25rem 0; color: #e5e5e5; font-size: 0.875rem;">
                            📅 ${event.event_date_local}
                        </p>
                    ` : ''}
                    ${event.venue_name ? `
                        <p style="margin: 0.25rem 0; color: #e5e5e5; font-size: 0.875rem;">
                            📍 ${event.venue_name}${event.venue_city ? `, ${event.venue_city}` : ''}
                        </p>
                    ` : ''}
                    ${event.external_ticket_url ? `
                        <a href="${event.external_ticket_url}" style="display: inline-block; margin-top: 1rem; padding: 0.75rem 1.5rem; background: #319DFF; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">
                            Get Tickets
                        </a>
                    ` : ''}
                </div>
            </div>
        `).join('');

        return `
            <div style="${baseStyles}">
                <div style="${containerStyles}">
                    <h1 style="${titleStyles}">${metaTags.title || 'BOUNCE2BOUNCE - Events'}</h1>
                    <p style="${descriptionStyles}">${metaTags.description || 'Discover exclusive live music events.'}</p>
                    <div style="margin-top: 2rem;">${eventsHtml}</div>
                </div>
            </div>
        `;
    }

    // Contact Page: Render static contact information
    if (pageType === 'contact') {
        return `
            <div style="${baseStyles}">
                <div style="${containerStyles}">
                    <h1 style="${titleStyles}">${metaTags.title || 'Contact Us'}</h1>
                    <p style="${descriptionStyles}">${metaTags.description || 'Get in touch with BOUNCE2BOUNCE.'}</p>
                    <div style="margin-top: 2rem; line-height: 1.75; color: #e5e5e5;">
                        <p style="margin-bottom: 1rem;">
                            <strong>Email:</strong> <a href="mailto:info@bounce2bounce.com" style="color: #319DFF; text-decoration: none;">info@bounce2bounce.com</a>
                        </p>
                        <p style="margin-bottom: 1rem;">
                            <strong>Follow us:</strong>
                        </p>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin-bottom: 0.5rem;">
                                <a href="https://instagram.com/bounce2bounce_" target="_blank" style="color: #319DFF; text-decoration: none;">Instagram</a>
                            </li>
                            <li style="margin-bottom: 0.5rem;">
                                <a href="https://twitter.com/bounce2bounce_" target="_blank" style="color: #319DFF; text-decoration: none;">Twitter</a>
                            </li>
                            <li style="margin-bottom: 0.5rem;">
                                <a href="https://facebook.com/bounce2bounce_" target="_blank" style="color: #319DFF; text-decoration: none;">Facebook</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    // Fallback for all other pages: Return minimal noscript content
    return `
            <noscript>
                <div style="max-width: 800px; margin: 100px auto; padding: 40px 20px; font-family: Inter, system-ui, sans-serif; color: #ffffff; text-align: center;">
                    <h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 1.5rem;">JavaScript Required</h1>
                    <p style="font-size: 1.125rem; line-height: 1.75; color: #e5e5e5;">
                        This page requires JavaScript to display the full interactive experience. Please enable JavaScript in your browser.
                    </p>
                </div>
            </noscript>
        `;
}

// Helper function to generate structured data based on page type
async function generateStructuredData(pageType, seoSettings, metaTags, escapeHtml, ensureAbsoluteUrl) {
    const baseUrl = 'https://bounce2bounce.com';

    // Build social media sameAs array
    const sameAs = [
        seoSettings.social_instagram_url,
        seoSettings.social_twitter_url,
        seoSettings.social_facebook_url,
        seoSettings.social_tiktok_url,
        seoSettings.social_youtube_url,
        seoSettings.social_linkedin_url,
        seoSettings.social_spotify_url
    ].filter(url => url && url.trim() !== '');

    // Organization schema (used on all pages)
    const organizationSchema = {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": escapeHtml(seoSettings.organization_name || "BOUNCE2BOUNCE"),
        "alternateName": escapeHtml(seoSettings.organization_alternate_name || "B2B"),
        "url": baseUrl,
        "logo": {
            "@type": "ImageObject",
            "url": ensureAbsoluteUrl(seoSettings.organization_logo_url || metaTags.ogImage, baseUrl)
        },
        "description": escapeHtml(seoSettings.organization_description || "NJ's premiere EDM collective curating exclusive live music events and unforgettable experiences."),
        "sameAs": sameAs,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": escapeHtml(seoSettings.organization_phone || ""),
            "contactType": "customer service",
            "email": escapeHtml(seoSettings.organization_email || "info@bounce2bounce.com"),
            "availableLanguage": "English"
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": escapeHtml(seoSettings.organization_address_city || "Asbury Park"),
            "addressRegion": escapeHtml(seoSettings.organization_address_state || "NJ"),
            "addressCountry": escapeHtml(seoSettings.organization_address_country || "US")
        }
    };

    if (seoSettings.organization_founded_year) {
        organizationSchema.foundingDate = seoSettings.organization_founded_year.toString();
    }

    // Generate page-specific structured data
    if (pageType === 'homepage') {
        // Homepage: Organization + WebSite + BreadcrumbList
        const websiteSchema = {
            "@type": "WebSite",
            "@id": `${baseUrl}/#website`,
            "name": "BOUNCE2BOUNCE",
            "url": baseUrl,
            "description": escapeHtml(metaTags.description),
            "publisher": {
                "@id": `${baseUrl}/#organization`
            },
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${baseUrl}/?s={search_term_string}`
                },
                "query-input": "required name=search_term_string"
            },
            "hasPart": [
                {
                    "@type": "WebPage",
                    "@id": `${baseUrl}/about`,
                    "name": "About BOUNCE2BOUNCE",
                    "description": escapeHtml(seoSettings.about_page_description || "Learn about our mission and values"),
                    "url": `${baseUrl}/about`
                },
                {
                    "@type": "WebPage",
                    "@id": `${baseUrl}/faq`,
                    "name": "FAQ",
                    "description": escapeHtml(seoSettings.faq_page_description || "Frequently asked questions"),
                    "url": `${baseUrl}/faq`
                }
            ]
        };

        // 🖼️ GOOGLE IMAGE SEO: Fetch event cover images and create ImageObject structured data
        // 🎯 GOOGLE EVENT SEO: Create Event structured data for all displayed events
        let eventImageSchemas = [];
        let eventSchemas = [];
        try {
            const dashboardApiUrl = env.NODE_ENV === 'production' ?
                'https://admin.b2b.click/api/home-settings/homepage-data' :
                'http://localhost:3002/api/home-settings/homepage-data';

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

            const eventsResponse = await fetch(dashboardApiUrl, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            clearTimeout(timeoutId);

            if (eventsResponse.ok) {
                const eventsData = await eventsResponse.json();
                const featuredEvents = eventsData.featuredEvents || [];
                const homepageEvents = eventsData.homepageEvents || [];
                const allEvents = [...featuredEvents, ...homepageEvents];

                console.log(`🖼️ Creating ImageObject schemas for ${allEvents.length} event cover images`);
                console.log(`🎯 Creating Event schemas for ${allEvents.length} events`);

                // Create ImageObject schema for each event cover image
                eventImageSchemas = allEvents
                    .filter(event => event.cover_image) // Only events with cover images
                    .map((event, index) => {
                        // Use absolute URL for image (required by Google)
                        const imageUrl = event.cover_image;
                        const absoluteImageUrl = imageUrl.startsWith('http')
                            ? imageUrl
                            : `https://admin.b2b.click${imageUrl}`;

                        // Build ImageObject with all available metadata
                        const imageObject = {
                            "@type": "ImageObject",
                            "@id": `${baseUrl}/#event-image-${event.id}`,
                            "contentUrl": absoluteImageUrl,
                            "url": baseUrl, // The page containing the image (homepage)
                            "name": escapeHtml(event.image_title || event.title || `${event.artist_name || 'Event'} Cover Image`),
                            "description": escapeHtml(event.image_description || event.image_alt_text || `Cover image for ${event.title || event.artist_name || 'event'}`),
                            "width": event.image_width || null,
                            "height": event.image_height || null
                        };

                        // 🚨 GOOGLE REQUIREMENT: At least one of creator, creditText, copyrightNotice, or license
                        // Add creator information (use organization as default if no specific creator)
                        if (event.image_creator_name) {
                            imageObject.creator = {
                                "@type": "Person",
                                "name": escapeHtml(event.image_creator_name)
                            };
                        } else {
                            // Default to organization as creator
                            imageObject.creator = {
                                "@type": "Organization",
                                "name": "BOUNCE2BOUNCE"
                            };
                        }

                        // Add credit text (fallback to default if not set)
                        imageObject.creditText = escapeHtml(event.image_credit_text || "BOUNCE2BOUNCE");

                        // Add copyright notice (fallback to default if not set)
                        imageObject.copyrightNotice = escapeHtml(
                            event.image_copyright_notice ||
                            `© ${new Date().getFullYear()} BOUNCE2BOUNCE. All rights reserved.`
                        );

                        // Add license URL (use Creative Commons Attribution-NonCommercial as default)
                        // This enables "Licensable" badge in Google Images
                        imageObject.license = event.image_license_url || "https://creativecommons.org/licenses/by-nc/4.0/";

                        // Add acquire license page URL (contact page for licensing inquiries)
                        imageObject.acquireLicensePage = event.image_acquire_license_page_url || `${baseUrl}/contact`;

                        return imageObject;
                    })
                    .filter(schema => schema.contentUrl); // Only include images with valid URLs

                console.log(`✅ Created ${eventImageSchemas.length} ImageObject schemas for event cover images`);

                // 🎯 GOOGLE EVENT SEO: Create Event structured data for each event
                // This allows Google to discover events directly from the homepage
                eventSchemas = allEvents
                    .filter(event => event.slug && event.is_active) // Only active events with slugs
                    .map((event) => {
                        const eventUrl = `${baseUrl}/event/${event.slug}`;

                        // Build Event schema with all required and recommended fields
                        const eventSchema = {
                            "@type": "Event",
                            "@id": `${eventUrl}#event`,
                            "name": escapeHtml(event.title),
                            "description": escapeHtml(event.description || `Join us for ${event.title}${event.artist_name ? ` featuring ${event.artist_name}` : ''}`),
                            "url": eventUrl
                        };

                        // IMAGE: Multiple aspect ratios (1x1, 4x3, 16x9) - RECOMMENDED by Google
                        if (event.cover_image) {
                            const imageUrl = event.cover_image.startsWith('http')
                                ? event.cover_image
                                : `https://admin.b2b.click${event.cover_image}`;
                            eventSchema.image = [imageUrl, imageUrl, imageUrl]; // TODO: Use actual variants when available
                        }

                        // START DATE: ISO 8601 with timezone - REQUIRED
                        if (event.event_datetime_utc) {
                            eventSchema.startDate = event.event_datetime_utc;
                        } else if (event.event_date) {
                            eventSchema.startDate = event.event_date;
                        }

                        // END DATE: ISO 8601 with timezone - RECOMMENDED
                        if (event.event_end_date) {
                            eventSchema.endDate = event.event_end_date;
                        }

                        // EVENT STATUS: EventScheduled, EventCancelled, etc. - RECOMMENDED
                        eventSchema.eventStatus = `https://schema.org/${event.event_status || 'EventScheduled'}`;

                        // EVENT ATTENDANCE MODE: OfflineEventAttendanceMode (physical location) - RECOMMENDED
                        eventSchema.eventAttendanceMode = "https://schema.org/OfflineEventAttendanceMode";

                        // PERFORMER: Person or PerformingGroup - RECOMMENDED
                        if (event.artist_name) {
                            eventSchema.performer = {
                                "@type": event.performer_type || "Person",
                                "name": escapeHtml(event.artist_name)
                            };
                        }

                        // LOCATION: Place with complete PostalAddress - REQUIRED
                        // DUAL ADDRESS SYSTEM: Use structured venue fields for SEO, event_address for UI display
                        const location = {
                            "@type": "Place"
                        };

                        // Venue name (use venue_name if available, otherwise event_address)
                        if (event.venue_name) {
                            location.name = escapeHtml(event.venue_name);
                        } else if (event.event_address) {
                            location.name = escapeHtml(event.event_address);
                        }

                        // Complete PostalAddress with all components
                        const address = {
                            "@type": "PostalAddress"
                        };

                        if (event.venue_street_address) {
                            address.streetAddress = escapeHtml(event.venue_street_address);
                        }
                        if (event.venue_city) {
                            address.addressLocality = escapeHtml(event.venue_city);
                        }
                        if (event.venue_state) {
                            address.addressRegion = escapeHtml(event.venue_state);
                        }
                        if (event.venue_postal_code) {
                            address.postalCode = escapeHtml(event.venue_postal_code);
                        }
                        address.addressCountry = event.venue_country || "US";

                        location.address = address;

                        // Geo coordinates (if available)
                        if (event.address_latitude && event.address_longitude) {
                            location.geo = {
                                "@type": "GeoCoordinates",
                                "latitude": parseFloat(event.address_latitude),
                                "longitude": parseFloat(event.address_longitude)
                            };
                        }

                        eventSchema.location = location;

                        // ORGANIZER: Organization - RECOMMENDED
                        eventSchema.organizer = {
                            "@type": "Organization",
                            "name": "BOUNCE2BOUNCE",
                            "url": baseUrl
                        };

                        // OFFERS: Ticket pricing and availability - RECOMMENDED
                        if (event.external_ticket_url || event.posh_embed_url) {
                            const offerUrl = event.external_ticket_url || event.posh_embed_url;

                            eventSchema.offers = {
                                "@type": "Offer",
                                "url": offerUrl,
                                "price": event.ticket_price_amount ? event.ticket_price_amount.toString() : "0",
                                "priceCurrency": event.ticket_price_currency || "USD",
                                "availability": `https://schema.org/${event.ticket_availability || 'InStock'}`,
                                "validFrom": event.created_at
                            };
                        }

                        return eventSchema;
                    });

                console.log(`✅ Created ${eventSchemas.length} Event schemas for homepage events`);
            } else {
                console.warn(`⚠️ Failed to fetch events for structured data: ${eventsResponse.status}`);
            }
        } catch (error) {
            console.warn('⚠️ Error fetching events for structured data:', error.message);
            // Continue without event schemas - not critical for page rendering
        }

        // Homepage: No breadcrumb needed (Google requires at least 2 items, homepage only has 1)
        // Per Google's guidelines: "It's not required to include the top-level domain"
        // Include Organization, WebSite, Event schemas, and ImageObject schemas in @graph
        return JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [organizationSchema, websiteSchema, ...eventSchemas, ...eventImageSchemas]
        }, null, 2);

    } else if (pageType === 'about') {
        // About Page: Organization + AboutPage + BreadcrumbList + ImageObject (for gallery images)
        const aboutPageSchema = {
            "@type": "AboutPage",
            "@id": `${baseUrl}/about#webpage`,
            "name": escapeHtml(metaTags.title),
            "description": escapeHtml(metaTags.description),
            "url": `${baseUrl}/about`,
            "isPartOf": {
                "@id": `${baseUrl}/#website`
            },
            "mainEntity": {
                "@id": `${baseUrl}/#organization`
            },
            "breadcrumb": {
                "@id": `${baseUrl}/about#breadcrumb`
            },
            "primaryImageOfPage": {
                "@type": "ImageObject",
                "url": ensureAbsoluteUrl(metaTags.ogImage, baseUrl)
            }
        };

        const breadcrumbSchema = {
            "@type": "BreadcrumbList",
            "@id": `${baseUrl}/about#breadcrumb`,
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": `${baseUrl}/`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "About"
                    // Note: Last breadcrumb item omits "item" property per Google's guidelines
                }
            ]
        };

        // 🖼️ GOOGLE IMAGE SEO: Fetch gallery images and create ImageObject structured data
        // This enables Google Image Search indexing and Rich Results for gallery images
        let galleryImageSchemas = [];
        try {
            const dashboardApiUrl = env.NODE_ENV === 'production' ?
                'https://admin.b2b.click/api/settings/about/gallery/public' :
                'http://localhost:3002/api/settings/about/gallery/public';

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

            const galleryResponse = await fetch(dashboardApiUrl, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            clearTimeout(timeoutId);

            if (galleryResponse.ok) {
                const galleryData = await galleryResponse.json();
                const galleryImages = galleryData.data || [];

                console.log(`🖼️ Fetched ${galleryImages.length} gallery images for ImageObject schema`);

                // Create ImageObject schema for each gallery image
                galleryImageSchemas = galleryImages.map((image, index) => {
                    // Use absolute URL for image (required by Google)
                    const imageUrl = image.urls?.large || image.url || image.src;
                    const absoluteImageUrl = imageUrl.startsWith('http')
                        ? imageUrl
                        : `https://admin.b2b.click${imageUrl}`;

                    // Build ImageObject with all available metadata
                    const imageObject = {
                        "@type": "ImageObject",
                        "@id": `${baseUrl}/about#gallery-image-${index + 1}`,
                        "contentUrl": absoluteImageUrl,
                        "url": `${baseUrl}/about`, // The page containing the image
                        "name": escapeHtml(image.title || image.alt || `BOUNCE2BOUNCE Gallery Image ${index + 1}`),
                        "description": escapeHtml(image.description || image.alt || `Gallery image from BOUNCE2BOUNCE About page`),
                        "width": image.width || null,
                        "height": image.height || null
                    };

                    // 🚨 GOOGLE REQUIREMENT: At least one of creator, creditText, copyrightNotice, or license
                    // Add creator information (use organization as default if no specific creator)
                    // If creator_name is 'BOUNCE2BOUNCE' (the default), use Organization type
                    if (image.creator_name && image.creator_name !== 'BOUNCE2BOUNCE') {
                        imageObject.creator = {
                            "@type": "Person",
                            "name": escapeHtml(image.creator_name)
                        };
                    } else {
                        // Default to organization as creator
                        imageObject.creator = {
                            "@type": "Organization",
                            "name": "BOUNCE2BOUNCE"
                        };
                    }

                    // Add credit text (fallback to default if not set)
                    imageObject.creditText = escapeHtml(image.credit_text || "BOUNCE2BOUNCE");

                    // Add copyright notice (fallback to default if not set)
                    imageObject.copyrightNotice = escapeHtml(
                        image.copyright_notice ||
                        `© ${new Date().getFullYear()} BOUNCE2BOUNCE. All rights reserved.`
                    );

                    // Add license URL (use Creative Commons Attribution-NonCommercial as default)
                    // This enables "Licensable" badge in Google Images
                    imageObject.license = image.license_url || "https://creativecommons.org/licenses/by-nc/4.0/";

                    // Add acquire license page URL (contact page for licensing inquiries)
                    imageObject.acquireLicensePage = image.acquire_license_page_url || `${baseUrl}/contact`;

                    return imageObject;
                }).filter(schema => schema.contentUrl); // Only include images with valid URLs

                console.log(`✅ Created ${galleryImageSchemas.length} ImageObject schemas for About page gallery`);
            } else {
                console.warn(`⚠️ Failed to fetch gallery images for ImageObject schema: ${galleryResponse.status}`);
            }
        } catch (error) {
            console.warn('⚠️ Error fetching gallery images for ImageObject schema:', error.message);
            // Continue without gallery image schemas - not critical for page rendering
        }

        // Combine all schemas in @graph array
        const graphSchemas = [
            organizationSchema,
            aboutPageSchema,
            breadcrumbSchema,
            ...galleryImageSchemas // Add all gallery ImageObject schemas
        ];

        return JSON.stringify({
            "@context": "https://schema.org",
            "@graph": graphSchemas
        }, null, 2);

    } else if (pageType === 'faq') {
        // ✅ SEO FIX: FAQ Page - Organization + BreadcrumbList only
        // FAQPage schema with mainEntity is injected client-side by React (FAQPage.jsx)
        // This prevents "Duplicate field 'FAQPage'" error in Google Search Console
        const breadcrumbSchema = {
            "@type": "BreadcrumbList",
            "@id": `${baseUrl}/faq#breadcrumb`,
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": `${baseUrl}/`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "FAQ"
                    // Note: Last breadcrumb item omits "item" property per Google's guidelines
                }
            ]
        };

        return JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [organizationSchema, breadcrumbSchema]
        }, null, 2);
    }

    // Fallback (should not reach here)
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": escapeHtml(metaTags.title),
        "url": escapeHtml(metaTags.ogUrl)
    }, null, 2);
}

// 🚀 REACT HOMEPAGE - Serve React app with dynamic SEO meta tags
async function reactHomepage(req, res) {
    console.log('🚀🚀🚀 REACT HOMEPAGE FUNCTION CALLED - Dynamic SEO meta tags processing started');
    console.log('📍 Request path:', req.path);
    console.log('📍 Request URL:', req.url);
    console.log('📍 NODE_ENV:', process.env.NODE_ENV);

    try {
        const env = require('../env');
        const path = require('path');
        const fs = require('fs');
        const seoUtils = require('../utils/seo.utils');

        // Determine page type based on request path
        const requestPath = req.path.toLowerCase();
        let pageType = 'homepage';
        if (requestPath === '/about' || requestPath === '/about/') {
            pageType = 'about';
        } else if (requestPath === '/faq' || requestPath === '/faq/') {
            pageType = 'faq';
        }
        console.log('📄 Page type detected:', pageType);

        // Get SEO settings from dashboard API with timeout and fallback
        let seoSettings;
        try {
            const dashboardApiUrl = env.NODE_ENV === 'production' ?
                'https://admin.b2b.click/api/settings/seo' :
                'http://localhost:3002/api/settings/seo';

            // Add timeout to prevent hanging (increased for large responses)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const response = await fetch(dashboardApiUrl, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            clearTimeout(timeoutId);

            if (response.ok) {
                const apiResponse = await response.json();
                seoSettings = apiResponse.settings || apiResponse;
                console.log('✅ SEO settings fetched from dashboard API:', seoSettings.default_title);
            } else {
                throw new Error(`Dashboard API responded with ${response.status}`);
            }
        } catch (error) {
            console.warn('⚠️ Failed to fetch SEO settings from dashboard API, using defaults:', error.message);
            seoSettings = {
                // Default/Homepage SEO
                default_title: 'BOUNCE2BOUNCE - NJ\'S PREMIERE EDM COLLECTIVE',
                default_description: 'Discover exclusive live music events, connect with artists, and purchase tickets seamlessly. Join BOUNCE2BOUNCE for unforgettable music experiences.',
                default_keywords: 'live music events, concert tickets, artist promotion, event discovery, music experiences, exclusive events, BOUNCE2BOUNCE',
                default_author: 'BOUNCE2BOUNCE',
                default_og_image: 'https://admin.b2b.click/static/uploads/og-images/og-image-1758068780796-967082198.png',
                twitter_handle: '@bounce2bounce',
                // About Page SEO
                about_page_title: 'About BOUNCE2BOUNCE | NJ\'s Premiere EDM Collective',
                about_page_description: 'Learn about BOUNCE2BOUNCE - NJ\'s premiere EDM collective curating exclusive live music events.',
                about_page_keywords: 'about bounce2bounce, edm collective, live music events, nj music',
                about_page_og_image: 'https://admin.b2b.click/static/uploads/og-images/og-image-1758068780796-967082198.png',
                about_page_og_image_alt: 'About BOUNCE2BOUNCE - Preview Image',
                // FAQ Page SEO
                faq_page_title: 'FAQ - BOUNCE2BOUNCE | Frequently Asked Questions',
                faq_page_description: 'Frequently asked questions about BOUNCE2BOUNCE events, tickets, venues, and more.',
                faq_page_keywords: 'faq, questions, help, bounce2bounce support',
                faq_page_og_image: 'https://admin.b2b.click/static/uploads/og-images/og-image-1758068780796-967082198.png',
                faq_page_og_image_alt: 'FAQ - BOUNCE2BOUNCE - Preview Image',
                // Organization Schema (CRITICAL for structured data)
                organization_name: 'BOUNCE2BOUNCE',
                organization_alternate_name: 'B2B',
                organization_description: 'NJ\'s premiere EDM collective curating exclusive live music events and unforgettable experiences.',
                organization_logo_url: 'https://admin.b2b.click/static/uploads/og-images/og-image-1758068780796-967082198.png',
                organization_phone: '',
                organization_email: 'info@bounce2bounce.com',
                organization_address_city: 'Asbury Park',
                organization_address_state: 'NJ',
                organization_address_country: 'US',
                organization_founded_year: 2020,
                // Social Media URLs (CRITICAL for structured data)
                social_facebook_url: '',
                social_instagram_url: 'https://www.instagram.com/bounce2bounce',
                social_twitter_url: 'https://twitter.com/bounce2bounce',
                social_tiktok_url: '',
                social_youtube_url: '',
                social_linkedin_url: '',
                social_spotify_url: ''
            };
        }

        // Select page-specific SEO settings based on page type
        let pageTitle, pageDescription, pageKeywords, pageOgImage, pageOgImageAlt, pageUrl;

        if (pageType === 'about') {
            pageTitle = seoSettings.about_page_title || 'About BOUNCE2BOUNCE | NJ\'s Premiere EDM Collective';
            pageDescription = seoSettings.about_page_description || 'Learn about BOUNCE2BOUNCE - NJ\'s premiere EDM collective curating exclusive live music events.';
            pageKeywords = seoSettings.about_page_keywords || 'about bounce2bounce, edm collective, live music events, nj music';
            pageOgImage = seoSettings.about_page_og_image || seoSettings.default_og_image || 'https://admin.b2b.click/static/uploads/og-images/og-image-1758068780796-967082198.png';
            pageOgImageAlt = seoSettings.about_page_og_image_alt || 'About BOUNCE2BOUNCE - Preview Image';
            pageUrl = '/about';
        } else if (pageType === 'faq') {
            pageTitle = seoSettings.faq_page_title || 'FAQ - BOUNCE2BOUNCE | Frequently Asked Questions';
            pageDescription = seoSettings.faq_page_description || 'Frequently asked questions about BOUNCE2BOUNCE events, tickets, venues, and more.';
            pageKeywords = seoSettings.faq_page_keywords || 'faq, questions, help, bounce2bounce support';
            pageOgImage = seoSettings.faq_page_og_image || seoSettings.default_og_image || 'https://admin.b2b.click/static/uploads/og-images/og-image-1758068780796-967082198.png';
            pageOgImageAlt = seoSettings.faq_page_og_image_alt || 'FAQ - BOUNCE2BOUNCE - Preview Image';
            pageUrl = '/faq';
        } else {
            // Homepage
            pageTitle = seoSettings.default_title || 'BOUNCE2BOUNCE - NJ\'S PREMIERE EDM COLLECTIVE';
            pageDescription = seoSettings.default_description || 'Discover exclusive live music events and connect with artists';
            pageKeywords = seoSettings.default_keywords || 'live music events, concert tickets, artist promotion';
            pageOgImage = seoSettings.default_og_image || 'https://admin.b2b.click/static/uploads/og-images/og-image-1758068780796-967082198.png';
            pageOgImageAlt = pageTitle + ' - Preview Image';
            pageUrl = '/';
        }

        console.log('🏷️ Page-specific SEO:', { pageType, pageTitle, pageUrl });

        // Generate meta tags using SEO utils with proper image handling
        const metaTags = seoUtils.generateMetaTags({
            title: pageTitle,
            description: pageDescription,
            keywords: pageKeywords,
            author: seoSettings.default_author || 'BOUNCE2BOUNCE',
            image: pageOgImage,
            url: pageUrl
        });

        console.log('🏷️ Generated meta tags:', {
            title: metaTags.title,
            canonical: metaTags.canonical,
            ogUrl: metaTags.ogUrl,
            ogImage: metaTags.ogImage,
            ogTitle: metaTags.ogTitle,
            ogDescription: metaTags.ogDescription
        });

        // 🤖 BOT FIX: Fetch page-specific data server-side for bot-friendly rendering
        let pageData = null;

        if (pageType === 'faq') {
            // Fetch FAQ data
            try {
                const dashboardApiUrl = env.NODE_ENV === 'production' ?
                    'https://admin.b2b.click/api/settings/faq' :
                    'http://localhost:3002/api/settings/faq';

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);

                const response = await fetch(dashboardApiUrl, {
                    signal: controller.signal,
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
                });
                clearTimeout(timeoutId);

                if (response.ok) {
                    const apiResponse = await response.json();
                    pageData = apiResponse.data || apiResponse;
                    console.log('✅ FAQ data fetched for SSR:', pageData.length, 'items');
                } else {
                    console.warn('⚠️ FAQ API responded with', response.status);
                }
            } catch (error) {
                console.warn('⚠️ Failed to fetch FAQ data for SSR:', error.message);
            }
        } else if (pageType === 'about') {
            // Fetch About page content AND gallery images for SSR
            try {
                const dashboardApiUrl = env.NODE_ENV === 'production' ?
                    'https://admin.b2b.click/api/settings/about' :
                    'http://localhost:3002/api/settings/about';
                const galleryApiUrl = env.NODE_ENV === 'production' ?
                    'https://admin.b2b.click/api/settings/about/gallery/public' :
                    'http://localhost:3002/api/settings/about/gallery/public';

                // Fetch both About content and gallery images in parallel
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);

                const [aboutResponse, galleryResponse] = await Promise.all([
                    fetch(dashboardApiUrl, {
                        signal: controller.signal,
                        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
                    }),
                    fetch(galleryApiUrl, {
                        signal: controller.signal,
                        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
                    })
                ]);
                clearTimeout(timeoutId);

                if (aboutResponse.ok) {
                    const apiResponse = await aboutResponse.json();
                    pageData = apiResponse.data || apiResponse;
                    console.log('✅ About page content fetched for SSR');
                } else {
                    console.warn('⚠️ About API responded with', aboutResponse.status);
                }

                // 🖼️ GOOGLE IMAGE SEO FIX: Include gallery images in SSR for bot indexing
                if (galleryResponse.ok) {
                    const galleryData = await galleryResponse.json();
                    const galleryImages = galleryData.data || galleryData || [];
                    if (Array.isArray(galleryImages) && galleryImages.length > 0) {
                        pageData = pageData || {};
                        pageData.galleryImages = galleryImages;
                        console.log(`✅ Gallery images fetched for SSR: ${galleryImages.length} images`);
                    }
                } else {
                    console.warn('⚠️ Gallery API responded with', galleryResponse.status);
                }
            } catch (error) {
                console.warn('⚠️ Failed to fetch About content for SSR:', error.message);
            }
        } else if (pageType === 'homepage') {
            // Fetch homepage events data
            try {
                const dashboardApiUrl = env.NODE_ENV === 'production' ?
                    'https://admin.b2b.click/api/home-settings/homepage-data' :
                    'http://localhost:3002/api/home-settings/homepage-data';

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);

                const response = await fetch(dashboardApiUrl, {
                    signal: controller.signal,
                    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
                });
                clearTimeout(timeoutId);

                if (response.ok) {
                    const apiResponse = await response.json();
                    // Extract events from the response
                    const homepageEvents = apiResponse.homepageEvents || [];
                    const featuredEvents = apiResponse.featuredEvents || [];
                    const allEvents = [...featuredEvents, ...homepageEvents];
                    pageData = { events: allEvents };
                    console.log('✅ Homepage events fetched for SSR:', allEvents.length, 'events');
                } else {
                    console.warn('⚠️ Homepage API responded with', response.status);
                }
            } catch (error) {
                console.warn('⚠️ Failed to fetch homepage events for SSR:', error.message);
            }
        }
        // Contact page doesn't need API data - static content only

        // FIXED: Only use Vite-built React homepage to prevent bundle conflicts
        const reactIndexPath = path.join(__dirname, '../../dist/index.html');

        if (!fs.existsSync(reactIndexPath)) {
            console.error('🚨 CRITICAL: Vite-built React homepage not found at dist/index.html');
            console.error('🔧 Run "npm run build" to generate the Vite build');
            return res.status(500).send('Homepage build not found. Please run npm run build.');
        }

        console.log('📱 Serving React homepage from dist/index.html (Vite build only) with dynamic SEO');

        // Read the React HTML template
        let htmlContent = fs.readFileSync(reactIndexPath, 'utf8');

        // Escape HTML content for safe injection
        const escapeHtml = (text) => {
            if (!text) return '';
            return text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        };

        // Helper function to ensure absolute URL (don't double-prepend baseUrl)
        const ensureAbsoluteUrl = (url, base = 'https://bounce2bounce.com') => {
            if (!url) return '';
            // If already absolute (starts with http:// or https://), return as-is
            if (url.startsWith('http://') || url.startsWith('https://')) {
                return url;
            }
            // If relative, prepend baseUrl
            return `${base}${url.startsWith('/') ? url : '/' + url}`;
        };

        // Generate structured data with error handling to prevent page failures
        let structuredDataJson = '{}';
        try {
            structuredDataJson = await generateStructuredData(pageType, seoSettings, metaTags, escapeHtml, ensureAbsoluteUrl);
        } catch (structuredDataError) {
            console.warn('⚠️ Failed to generate structured data, using empty object:', structuredDataError.message);
        }

        // Generate dynamic meta tags HTML
        const dynamicMetaTags = `
    <!-- Dynamic SEO Meta Tags -->
    <meta name="description" content="${escapeHtml(metaTags.description)}">
    <meta name="keywords" content="${escapeHtml(metaTags.keywords)}">
    <meta name="author" content="${escapeHtml(metaTags.author)}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${escapeHtml(metaTags.ogType)}">
    <meta property="og:url" content="${escapeHtml(metaTags.ogUrl)}">
    <meta property="og:title" content="${escapeHtml(metaTags.ogTitle)}">
    <meta property="og:description" content="${escapeHtml(metaTags.ogDescription)}">
    <meta property="og:image" content="${escapeHtml(metaTags.ogImage)}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${escapeHtml(pageOgImageAlt)}">
    <meta property="og:site_name" content="${escapeHtml(metaTags.ogSiteName)}">
    <meta property="og:locale" content="en_US">

    <!-- Twitter -->
    <meta name="twitter:card" content="${escapeHtml(metaTags.twitterCard)}">
    <meta name="twitter:site" content="${escapeHtml(seoSettings.twitter_handle || '@bounce2bounce')}">
    <meta name="twitter:creator" content="${escapeHtml(seoSettings.twitter_handle || '@bounce2bounce')}">
    <meta name="twitter:url" content="${escapeHtml(metaTags.ogUrl)}">
    <meta name="twitter:title" content="${escapeHtml(metaTags.twitterTitle)}">
    <meta name="twitter:description" content="${escapeHtml(metaTags.twitterDescription)}">
    <meta name="twitter:image" content="${escapeHtml(metaTags.twitterImage)}">
    <meta name="twitter:image:alt" content="${escapeHtml(pageOgImageAlt)}">

    <!-- Additional SEO Meta Tags -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="${escapeHtml(metaTags.appleMobileWebAppCapable)}">
    <meta name="apple-mobile-web-app-title" content="${escapeHtml(metaTags.title)}">
    <meta name="application-name" content="${escapeHtml(metaTags.title)}">
    <meta name="theme-color" content="${escapeHtml(metaTags.themeColor)}">

    <!-- Canonical URL -->
    <link rel="canonical" href="${escapeHtml(metaTags.canonical)}">

    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    ${structuredDataJson}
    </script>`;

        // Replace the existing title and inject meta tags
        htmlContent = htmlContent.replace(
            /<title>.*?<\/title>/i,
            `<title>${escapeHtml(metaTags.title)}</title>`
        );

        // Remove any existing meta tags that we're about to replace to prevent duplicates
        htmlContent = htmlContent.replace(
            /<meta\s+name="description"[^>]*>/gi, ''
        ).replace(
            /<meta\s+name="keywords"[^>]*>/gi, ''
        ).replace(
            /<meta\s+name="author"[^>]*>/gi, ''
        ).replace(
            /<meta\s+property="og:[^"]*"[^>]*>/gi, ''
        ).replace(
            /<meta\s+name="twitter:[^"]*"[^>]*>/gi, ''
        ).replace(
            /<link\s+rel="canonical"[^>]*>/gi, ''
        );

        // Inject dynamic meta tags before the closing </head> tag
        htmlContent = htmlContent.replace(
            '</head>',
            `${dynamicMetaTags}\n    <!-- Server-side meta tags injected -->\n</head>`
        );

        // 🔧 CRITICAL FIX: Inject static content for bots AND in-app browsers
        // Instagram's in-app browser often fails to execute JavaScript properly, causing white pages
        // This ensures content is visible even when React fails to load
        const userAgent = req.headers['user-agent'] || '';

        // Detect social media bots and crawlers
        const isBot = /bot|crawler|spider|crawling|google|bingbot|yandex|baidu|duckduck/i.test(userAgent);

        // 🔧 INSTAGRAM FIX: Detect in-app browsers (Instagram, Facebook, TikTok, etc.)
        // These WebViews often have JavaScript execution issues
        const isInAppBrowser = /FBAN|FBAV|FB_IAB|FBIOS|FBSS|Instagram|musical_ly|TikTok|BytedanceWebview|Snapchat|Pinterest|Line\/|MicroMessenger|LinkedInApp/i.test(userAgent);

        // Detect WebViews that may have JavaScript issues
        const isWebView = /; wv\)|WebView/i.test(userAgent);

        // Detect iOS WebView (Safari WebView without full Safari signature)
        const isIOSWebView = /iPhone|iPad|iPod/i.test(userAgent) && /AppleWebKit/i.test(userAgent) && !/Safari|CriOS|FxiOS|OPiOS|mercury/i.test(userAgent);

        // Check if request has Instagram/Facebook tracking parameters (strong indicator of in-app browser)
        const urlParams = new URL(req.url, `https://${req.headers.host || 'bounce2bounce.com'}`).searchParams;
        const hasInAppParams = urlParams.has('fbclid') || urlParams.get('utm_source') === 'ig' || urlParams.get('utm_medium') === 'social';

        // Inject SSR content for bots OR in-app browsers to prevent white pages
        const needsSSRContent = isBot || isInAppBrowser || isWebView || isIOSWebView || hasInAppParams;

        if (needsSSRContent) {
            const browserType = isBot ? 'Bot' : isInAppBrowser ? 'In-App Browser' : isWebView ? 'WebView' : isIOSWebView ? 'iOS WebView' : 'In-App Params';
            console.log(`🤖 ${browserType} detected, injecting SSR content:`, userAgent.substring(0, 80));
            const staticContent = generateStaticContent(pageType, metaTags, seoSettings, pageData);

            // Create noscript fallback AND visible SSR content for in-app browsers
            // The SSR content will be hidden by React once it loads, but remains visible if React fails
            const ssrWrapper = isBot
                ? `<div id="ssr-content" style="display: block;">${staticContent}</div>`
                : `<div id="ssr-content" class="ssr-fallback" style="display: block;">${staticContent}</div>
                   <style>#ssr-content.ssr-fallback { transition: opacity 0.3s; } .app-loaded #ssr-content.ssr-fallback { opacity: 0; pointer-events: none; position: absolute; }</style>`;

            htmlContent = htmlContent.replace(
                /<div id="root"><\/div>/i,
                `${ssrWrapper}<div id="root"></div>`
            );
        } else {
            console.log('👤 Regular user detected, skipping SSR content injection');
        }

        // 🔧 ALWAYS add noscript fallback for users with JavaScript disabled
        const noscriptFallback = `
    <noscript>
        <style>
            body { background: #000; color: #fff; font-family: Inter, system-ui, sans-serif; margin: 0; padding: 0; }
            .noscript-container { max-width: 600px; margin: 80px auto; padding: 20px; text-align: center; }
            .noscript-logo { width: 200px; margin-bottom: 32px; }
            .noscript-title { font-size: 24px; font-weight: 700; margin-bottom: 16px; }
            .noscript-text { font-size: 16px; opacity: 0.8; line-height: 1.6; margin-bottom: 24px; }
            .noscript-btn { 
                display: inline-block; background: #319DFF; color: #fff; 
                padding: 14px 28px; border-radius: 12px; text-decoration: none; 
                font-weight: 600; font-size: 16px; margin: 8px;
            }
            .noscript-social { margin-top: 32px; }
            .noscript-social a { color: #319DFF; margin: 0 12px; text-decoration: none; }
        </style>
        <div class="noscript-container">
            <img src="/images/figma-exact/b2b-logo-nav.svg" alt="BOUNCE2BOUNCE" class="noscript-logo">
            <h1 class="noscript-title">BOUNCE2BOUNCE</h1>
            <p class="noscript-text">NJ's premiere EDM collective curating exclusive live music events and unforgettable experiences.</p>
            <p class="noscript-text">For the best experience, please enable JavaScript or open this link in your default browser.</p>
            <a href="https://bounce2bounce.com" class="noscript-btn">Open in Browser</a>
            <div class="noscript-social">
                <a href="https://instagram.com/bounce2bounce_">Instagram</a>
                <a href="mailto:info@bounce2bounce.com">Email</a>
            </div>
        </div>
    </noscript>`;

        // Inject noscript fallback before closing body tag
        htmlContent = htmlContent.replace(
            '</body>',
            `${noscriptFallback}\n</body>`
        );

        // Set caching headers
        if (env.NODE_ENV === 'production') {
            // 🚀 CRITICAL FIX: Reduce cache time to 1 minute for faster SEO updates
            // This ensures page-specific SEO changes appear within 1 minute
            const oneMinute = 1 * 60; // 1 minute in seconds
            const expiresDate = new Date(Date.now() + oneMinute * 1000).toUTCString();

            res.set({
                'Cache-Control': 'public, max-age=' + oneMinute + ', must-revalidate, stale-while-revalidate=60',
                'Expires': expiresDate,
                'Last-Modified': new Date().toUTCString(),
                'ETag': '"homepage-seo-' + pageType + '-' + Date.now() + '"',
                'Vary': 'Accept-Encoding'
            });
        } else {
            // Development: No cache for easier development
            res.set({
                'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Last-Modified': new Date().toUTCString(),
                'ETag': Date.now().toString()
            });
        }

        // Set aggressive cache-busting headers to prevent old bundle loading
        res.set({
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Last-Modified': new Date().toUTCString(),
            'ETag': `"${Date.now()}"`, // Force browser to check for updates
            'Vary': 'Accept-Encoding'
        });
        res.send(htmlContent);

    } catch (error) {
        console.error('🚨 CRITICAL: React homepage failed:', error);
        console.error('📍 Error stack:', error.stack);
        console.error('📍 Request path:', req.path);
        console.error('📍 User-Agent:', req.headers['user-agent']);

        // 🔧 FIX: Return a proper HTML error page instead of JSON
        // This ensures Instagram's in-app browser and other WebViews display a user-friendly error
        const errorHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>BOUNCE2BOUNCE - Page Loading</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            min-height: 100vh;
            background: #000;
            color: #fff;
            font-family: Inter, system-ui, -apple-system, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            text-align: center;
        }
        .logo { width: 180px; margin-bottom: 32px; }
        h1 { font-size: 24px; font-weight: 700; margin-bottom: 16px; }
        p { font-size: 16px; opacity: 0.8; margin-bottom: 24px; max-width: 400px; }
        .btn {
            display: inline-block;
            background: #319DFF;
            color: #fff;
            padding: 14px 28px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            transition: background 0.2s;
        }
        .btn:hover { background: #2080DD; }
        .retry-btn {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.3);
            margin-left: 12px;
        }
        .retry-btn:hover { background: rgba(255,255,255,0.1); }
    </style>
</head>
<body>
    <img src="/images/figma-exact/b2b-logo-nav.svg" alt="BOUNCE2BOUNCE" class="logo">
    <h1>Just a moment...</h1>
    <p>The page is loading. If it doesn't load automatically, tap the button below.</p>
    <div>
        <a href="/" class="btn">Go to Homepage</a>
        <a href="javascript:location.reload()" class="btn retry-btn">Retry</a>
    </div>
    <script>
        // Auto-retry after 2 seconds
        setTimeout(function() {
            window.location.reload();
        }, 2000);
    </script>
</body>
</html>`;

        res.status(500).send(errorHtml);
    }
}

module.exports = {
    addDomainAdmin,
    addDomainForm,
    admin,
    banned,
    confirmDomainBan,
    confirmDomainDelete,
    confirmDomainDeleteAdmin,
    confirmLinkBan,
    confirmLinkDelete,
    confirmUserBan,
    confirmUserDelete,
    createAdmin,
    createUser,
    eventEdit,
    getSupportEmail,
    home,
    homeEditor,
    homepage,
    linkEdit,
    linkEditAdmin,
    logout,
    // REMOVED: notFound - 404 pages now handled by React SPA routing
    reactHomepage,
    resetPassword,
    resetPasswordSetNewPassword,
    settings,
    stats,
    terms,
    verifyChangeEmail,
    verify,
}