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

// Helper function to generate structured data based on page type
function generateStructuredData(pageType, seoSettings, metaTags, escapeHtml) {
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
            "url": `${baseUrl}${escapeHtml(seoSettings.organization_logo_url || metaTags.ogImage)}`
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

        const breadcrumbSchema = {
            "@type": "BreadcrumbList",
            "@id": `${baseUrl}/#breadcrumb`,
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": `${baseUrl}/`
                }
            ]
        };

        return JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [organizationSchema, websiteSchema, breadcrumbSchema]
        }, null, 2);

    } else if (pageType === 'about') {
        // About Page: AboutPage + BreadcrumbList
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
                "url": `${baseUrl}${escapeHtml(metaTags.ogImage)}`
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
                    "name": "About",
                    "item": `${baseUrl}/about`
                }
            ]
        };

        return JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [aboutPageSchema, breadcrumbSchema]
        }, null, 2);

    } else if (pageType === 'faq') {
        // FAQ Page: FAQPage + BreadcrumbList
        // Note: The actual FAQ questions will be added client-side by React
        const faqPageSchema = {
            "@type": "FAQPage",
            "@id": `${baseUrl}/faq#webpage`,
            "name": escapeHtml(metaTags.title),
            "description": escapeHtml(metaTags.description),
            "url": `${baseUrl}/faq`,
            "isPartOf": {
                "@id": `${baseUrl}/#website`
            },
            "breadcrumb": {
                "@id": `${baseUrl}/faq#breadcrumb`
            }
        };

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
                    "name": "FAQ",
                    "item": `${baseUrl}/faq`
                }
            ]
        };

        return JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [faqPageSchema, breadcrumbSchema]
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
                default_og_image: '/images/og-image.png',
                twitter_handle: '@bounce2bounce',
                // About Page SEO
                about_page_title: 'About BOUNCE2BOUNCE | NJ\'s Premiere EDM Collective',
                about_page_description: 'Learn about BOUNCE2BOUNCE - NJ\'s premiere EDM collective curating exclusive live music events.',
                about_page_keywords: 'about bounce2bounce, edm collective, live music events, nj music',
                about_page_og_image: '/images/og-image.png',
                // FAQ Page SEO
                faq_page_title: 'FAQ - BOUNCE2BOUNCE | Frequently Asked Questions',
                faq_page_description: 'Frequently asked questions about BOUNCE2BOUNCE events, tickets, venues, and more.',
                faq_page_keywords: 'faq, questions, help, bounce2bounce support',
                faq_page_og_image: '/images/og-image.png',
                // Organization Schema (CRITICAL for structured data)
                organization_name: 'BOUNCE2BOUNCE',
                organization_alternate_name: 'B2B',
                organization_description: 'NJ\'s premiere EDM collective curating exclusive live music events and unforgettable experiences.',
                organization_logo_url: '/images/og-image.png',
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
        let pageTitle, pageDescription, pageKeywords, pageOgImage, pageUrl;

        if (pageType === 'about') {
            pageTitle = seoSettings.about_page_title || 'About BOUNCE2BOUNCE | NJ\'s Premiere EDM Collective';
            pageDescription = seoSettings.about_page_description || 'Learn about BOUNCE2BOUNCE - NJ\'s premiere EDM collective curating exclusive live music events.';
            pageKeywords = seoSettings.about_page_keywords || 'about bounce2bounce, edm collective, live music events, nj music';
            pageOgImage = seoSettings.about_page_og_image || seoSettings.default_og_image || '/images/og-image.png';
            pageUrl = '/about';
        } else if (pageType === 'faq') {
            pageTitle = seoSettings.faq_page_title || 'FAQ - BOUNCE2BOUNCE | Frequently Asked Questions';
            pageDescription = seoSettings.faq_page_description || 'Frequently asked questions about BOUNCE2BOUNCE events, tickets, venues, and more.';
            pageKeywords = seoSettings.faq_page_keywords || 'faq, questions, help, bounce2bounce support';
            pageOgImage = seoSettings.faq_page_og_image || seoSettings.default_og_image || '/images/og-image.png';
            pageUrl = '/faq';
        } else {
            // Homepage
            pageTitle = seoSettings.default_title || 'BOUNCE2BOUNCE - NJ\'S PREMIERE EDM COLLECTIVE';
            pageDescription = seoSettings.default_description || 'Discover exclusive live music events and connect with artists';
            pageKeywords = seoSettings.default_keywords || 'live music events, concert tickets, artist promotion';
            pageOgImage = seoSettings.default_og_image || '/images/og-image.png';
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
    <meta property="og:image:alt" content="${escapeHtml(metaTags.ogTitle)} - Preview Image">
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
    <meta name="twitter:image:alt" content="${escapeHtml(metaTags.twitterTitle)} - Preview Image">

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
    ${generateStructuredData(pageType, seoSettings, metaTags, escapeHtml)}
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

        // Set caching headers
        if (env.NODE_ENV === 'production') {
            // Production: Cache for 5 minutes to balance freshness and performance
            const fiveMinutes = 5 * 60; // 5 minutes in seconds
            const expiresDate = new Date(Date.now() + fiveMinutes * 1000).toUTCString();

            res.set({
                'Cache-Control': 'public, max-age=' + fiveMinutes + ', must-revalidate',
                'Expires': expiresDate,
                'Last-Modified': new Date().toUTCString(),
                'ETag': '"homepage-seo-' + Date.now() + '"'
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

        // NEVER fallback to Handlebars - always serve React or proper error
        // Return a proper error response instead of falling back to legacy templates
        return res.status(500).json({
            error: 'Homepage temporarily unavailable',
            message: 'The React homepage failed to load. Please try refreshing the page.',
            timestamp: new Date().toISOString(),
            requestId: req.id || 'unknown'
        });
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