const { Router } = require("express");

const helpers = require("../handlers/helpers.handler");
const renders = require("../handlers/renders.handler");
const sitemap = require("../handlers/sitemap.handler");
const eventsListing = require("../handlers/events-listing.handler");
const seoMonitoring = require("../handlers/seo-monitoring.handler");
const seoSettings = require("../handlers/seo-settings.handler");
const settings = require("../handlers/settings.handler");
const asyncHandler = require("../utils/asyncHandler");
const locals = require("../handlers/locals.handler");
const auth = require("../handlers/auth.handler");
const env = require("../env");

const router = Router();

// pages - Serve React SPA homepage by default
router.get(
    "/",
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(helpers.adminSetup),
    asyncHandler(locals.user),
    asyncHandler(renders.reactHomepage)
);



// Home page with modern navigation - React version
router.get(
    "/home",
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(helpers.adminSetup),
    asyncHandler(locals.user),
    asyncHandler(renders.reactHomepage)
);

// About page - React version
router.get(
    "/about",
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(helpers.adminSetup),
    asyncHandler(locals.user),
    asyncHandler(renders.reactHomepage)
);

// Contact page - React version
router.get(
    "/contact",
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(helpers.adminSetup),
    asyncHandler(locals.user),
    asyncHandler(renders.reactHomepage)
);

// FAQ page - React version
router.get(
    "/faq",
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(helpers.adminSetup),
    asyncHandler(locals.user),
    asyncHandler(renders.reactHomepage)
);


// Maintenance page - React version (always accessible)
router.get(
    "/maintenance",
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(helpers.adminSetup),
    asyncHandler(locals.user),
    asyncHandler(renders.reactHomepage)
);

// 🛍️ Shop page - Customer-facing product catalog (React version)
router.get(
    "/shop",
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(helpers.adminSetup),
    asyncHandler(locals.user),
    asyncHandler(renders.reactHomepage)
);

// 🛍️ Shop checkout success page - Order confirmation (React version)
router.get(
    "/shop/success",
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(helpers.adminSetup),
    asyncHandler(locals.user),
    asyncHandler(renders.reactHomepage)
);

// 🛍️ Shop checkout page - Cart review and checkout (React version)
router.get(
    "/shop/checkout",
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(helpers.adminSetup),
    asyncHandler(locals.user),
    asyncHandler(renders.reactHomepage)
);

// 🛍️ Shop cart page - Shopping cart (React version)
router.get(
    "/shop/cart",
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(helpers.adminSetup),
    asyncHandler(locals.user),
    asyncHandler(renders.reactHomepage)
);

// 🛍️ Shop product detail page - Individual product view (React version)
// NOTE: This MUST come AFTER all specific /shop/* routes since :productId is a catch-all
router.get(
    "/shop/:productId",
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(helpers.adminSetup),
    asyncHandler(locals.user),
    asyncHandler(renders.reactHomepage)
);

// REMOVED: Handlebars homepage fallback - React-only serving to prevent template conflicts

// ✅ SEO FIX: Removed /events redirect - this was causing "Page with redirect" errors in Google Search Console
// The homepage (/) already displays events, so /events redirect is unnecessary
// Legacy Handlebars template (events-listing.hbs) archived in server/views/_archived_handlebars/

// 🚀 BACKUP: Original URL shortener homepage
router.get(
    "/shortener",
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(helpers.adminSetup),
    asyncHandler(locals.user),
    asyncHandler(renders.homepage)
);

// Home Editor dashboard page
router.get(
    "/dashboard/home-editor",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(renders.homeEditor)
);

// Redirect old login to new admin login
router.get(
    "/login",
    (req, res) => {
        const returnTo = req.query.returnTo || '/dashboard';
        res.redirect(`/admin/login?returnTo=${encodeURIComponent(returnTo)}`);
    }
);

router.get(
    "/logout",
    asyncHandler(renders.logout)
);

router.get(
    "/create-admin",
    asyncHandler(renders.createAdmin)
);

// REMOVED: Old Handlebars 404 route - now handled by React SPA routing

// Settings Routes (Main Settings Hub)
router.get(
    "/dashboard/settings",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(settings.renderSettings)
);

router.post(
    "/dashboard/settings",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(settings.updateSettings)
);

router.get(
    "/dashboard/settings/export",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(settings.exportSettings)
);

router.post(
    "/dashboard/settings/reset",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(settings.resetSettings)
);

// SEO Settings Routes (Legacy - will redirect to main settings)
router.get(
    "/dashboard/seo-settings",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    (req, res) => {
        // Redirect to main settings page with SEO section active
        res.redirect('/dashboard/settings#seo');
    }
);

router.post(
    "/dashboard/seo-settings",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(settings.updateSettings)
);

router.post(
    "/dashboard/seo-settings/file/:fileName",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(seoSettings.updateFileContent)
);

router.post(
    "/dashboard/seo-settings/restore/:backupId",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(seoSettings.restoreFileFromBackup)
);

router.get(
    "/dashboard/admin",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(renders.admin)
);

router.get(
    "/dashboard/stats",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(renders.stats)
);

router.get(
    "/banned",
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(locals.user),
    asyncHandler(renders.banned)
);



router.get(
    "/reset-password",
    auth.featureAccessPage([env.MAIL_ENABLED]),
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(locals.user),
    asyncHandler(renders.resetPassword)
);

router.get(
    "/reset-password/:resetPasswordToken",
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(locals.user),
    asyncHandler(renders.resetPasswordSetNewPassword)
);

router.get(
    "/verify-email/:changeEmailToken",
    asyncHandler(auth.changeEmail),
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(locals.user),
    asyncHandler(renders.verifyChangeEmail)
);

router.get(
    "/verify/:verificationToken",
    asyncHandler(auth.verify),
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(locals.user),
    asyncHandler(renders.verify)
);

router.get(
    "/terms",
    asyncHandler(auth.jwtLoosePage),
    asyncHandler(locals.user),
    asyncHandler(renders.terms)
);

// partial renders
router.get(
    "/confirm-link-delete",
    locals.noLayout,
    asyncHandler(auth.jwt),
    asyncHandler(renders.confirmLinkDelete)
);

router.get(
    "/confirm-link-ban",
    locals.noLayout,
    locals.viewTemplate("partials/links/dialog/message"),
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    asyncHandler(renders.confirmLinkBan)
);

router.get(
    "/confirm-user-delete",
    locals.noLayout,
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    asyncHandler(renders.confirmUserDelete)
);

router.get(
    "/confirm-user-ban",
    locals.noLayout,
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    asyncHandler(renders.confirmUserBan)
);

router.get(
    "/create-user",
    locals.noLayout,
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    asyncHandler(renders.createUser)
);

router.get(
    "/add-domain",
    locals.noLayout,
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    asyncHandler(renders.addDomainAdmin)
);


router.get(
    "/confirm-domain-ban",
    locals.noLayout,
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    asyncHandler(renders.confirmDomainBan)
);


router.get(
    "/confirm-domain-delete-admin",
    locals.noLayout,
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    asyncHandler(renders.confirmDomainDeleteAdmin)
);

router.get(
    "/link/edit/:id",
    locals.noLayout,
    asyncHandler(auth.jwt),
    asyncHandler(renders.linkEdit)
);

router.get(
    "/dashboard/admin/link/edit/:id",
    locals.noLayout,
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    asyncHandler(renders.linkEditAdmin)
);

// Admin table endpoints for tab switching
router.get(
    "/dashboard/admin/links/table",
    locals.noLayout,
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    (req, res) => {
        res.render("partials/admin/links/table", {
            onload: true
        });
    }
);

router.get(
    "/dashboard/admin/users/table",
    locals.noLayout,
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    (req, res) => {
        res.render("partials/admin/users/table", {
            onload: true
        });
    }
);

router.get(
    "/dashboard/admin/domains/table",
    locals.noLayout,
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    (req, res) => {
        res.render("partials/admin/domains/table", {
            onload: true
        });
    }
);

router.get(
    "/dashboard/admin/home-settings/table",
    locals.noLayout,
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    (req, res) => {
        res.render("partials/admin/home_settings/table", {
            onload: true
        });
    }
);

router.get(
    "/add-domain-form",
    locals.noLayout,
    asyncHandler(auth.jwt),
    asyncHandler(renders.addDomainForm)
);

router.get(
    "/confirm-domain-delete",
    locals.noLayout,
    locals.viewTemplate("partials/settings/domain/delete"),
    asyncHandler(auth.jwt),
    asyncHandler(renders.confirmDomainDelete)
);



router.get(
    "/get-support-email",
    locals.noLayout,
    locals.viewTemplate("partials/support_email"),
    asyncHandler(renders.getSupportEmail)
);

// Event creation page
router.get(
    "/dashboard/events/create",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    (req, res) => {
        // Redirect to events page with create modal trigger
        res.redirect("/dashboard/events?create=true");
    }
);

router.get(
    "/dashboard/events/:id/edit",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(renders.eventEdit)
);

// Redirect old dashboard login to new admin login
router.get(
    "/dashboard/login",
    (req, res) => {
        const returnTo = req.query.returnTo || '/dashboard';
        res.redirect(`/admin/login?returnTo=${encodeURIComponent(returnTo)}`);
    }
);

// Return 404 for /dashboard route on public homepage
// Admin dashboard is at admin.b2b.click (separate domain)
// Future: Regular user accounts will have their own dashboard system
router.get(
    "/dashboard",
    (req, res) => {
        console.log(`🚫 404: /dashboard route not available on public homepage`);
        // Serve React SPA which will handle 404 routing
        res.status(404).sendFile(path.join(__dirname, '../../dist/index.html'));
    }
);

// Legacy dashboard routes return 404 on public homepage
router.get(
    "/dashboard-old",
    (req, res) => {
        console.log(`🚫 404: /dashboard-old route not available on public homepage`);
        res.status(404).sendFile(path.join(__dirname, '../../dist/index.html'));
    }
);

// SMS dashboard returns 404 on public homepage
router.get(
    "/sms",
    (req, res) => {
        console.log(`🚫 404: /sms route not available on public homepage`);
        res.status(404).sendFile(path.join(__dirname, '../../dist/index.html'));
    }
);

// New Laylo-style pages

// Users page (formerly Contact Book)
router.get(
    "/dashboard/users",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(async(req, res) => {
        try {
            res.render("contact-book", {
                title: "Users",
                pageTitle: "Users",
                layout: "layouts/modern-dashboard",
                currentPage: "users",
                user: req.user,
                domain: env.DEFAULT_DOMAIN
            });
        } catch (error) {
            console.error('❌ Users page error:', error);
            res.status(500).render("error", {
                title: "Error",
                layout: "layouts/modern-dashboard",
                error: "Failed to load users page"
            });
        }
    })
);

router.get(
    "/profile",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    async(req, res) => {
        try {
            const query = require("../queries");

            // Get user stats
            const totalEvents = await query.event.countByUser(req.user.id);
            const totalLinks = await query.link.countByUser(req.user.id);
            const totalFans = await query.event.getTotalFansByUser(req.user.id);

            res.render("modern-profile", {
                title: "Profile",
                pageTitle: "Profile",
                layout: "layouts/modern-dashboard",
                currentPage: "profile",
                user: req.user,
                stats: {
                    totalEvents: totalEvents || 0,
                    totalLinks: totalLinks || 0,
                    totalFans: totalFans || 0
                }
            });
        } catch (error) {
            console.error('Profile error:', error);

            res.render("modern-profile", {
                title: "Profile",
                pageTitle: "Profile",
                layout: "layouts/modern-dashboard",
                currentPage: "profile",
                user: req.user,
                stats: {
                    totalDrops: 0,
                    totalLinks: 0,
                    totalFans: 0
                }
            });
        }
    }
);

// Events page - Integrated with existing event system
router.get(
    "/dashboard/events",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    async(req, res) => {
        try {
            const query = require("../queries");

            // Get user's events with stats using existing queries
            const userEvents = await query.event.findByUserWithStats(req.user.id, { limit: 50 });

            // Calculate stats from the actual data
            const totalEvents = userEvents.length;
            const activeEvents = userEvents.filter(event => event.is_active).length;
            const totalFans = userEvents.reduce((sum, event) => sum + (event.signup_count || 0), 0);

            console.log(`📊 Events page loaded for user ${req.user.id}:`, {
                totalEvents,
                activeEvents,
                totalFans,
                eventsFound: userEvents.length
            });

            res.render("modern-events", {
                title: "Events",
                pageTitle: "Events",
                layout: "layouts/modern-dashboard",
                currentPage: "events",
                user: req.user,
                events: userEvents || [],
                domain: process.env.DEFAULT_DOMAIN || 'localhost:3000',
                stats: {
                    totalEvents: totalEvents || 0,
                    activeEvents: activeEvents || 0,
                    totalFans: totalFans || 0
                }
            });
        } catch (error) {
            console.error('❌ Events page error:', error);

            res.render("modern-events", {
                title: "Events",
                pageTitle: "Events",
                layout: "layouts/modern-dashboard",
                currentPage: "events",
                user: req.user,
                events: [],
                domain: process.env.DEFAULT_DOMAIN || 'localhost:3000',
                stats: {
                    totalEvents: 0,
                    activeEvents: 0,
                    totalFans: 0
                },
                error: "Failed to load events data"
            });
        }
    }
);

// Links page
router.get(
    "/links",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    async(req, res) => {
        try {
            const query = require("../queries");

            // Get user's links using existing function
            const userLinks = await query.link.get({ "links.user_id": req.user.id }, { skip: 0, limit: 20 });

            // Calculate stats from actual data
            const totalLinks = userLinks.length;
            const totalClicks = userLinks.reduce((sum, link) => sum + (link.visit_count || 0), 0);

            console.log(`📊 Links page loaded for user ${req.user.id}:`, {
                totalLinks,
                totalClicks,
                linksFound: userLinks.length
            });

            res.render("modern-links", {
                title: "Links",
                pageTitle: "Links",
                layout: "layouts/modern-dashboard",
                currentPage: "links",
                user: req.user,
                links: userLinks || [],
                stats: {
                    totalLinks: totalLinks || 0,
                    totalClicks: totalClicks || 0
                }
            });
        } catch (error) {
            console.error('❌ Links error:', error);

            res.render("modern-links", {
                title: "Links",
                pageTitle: "Links",
                layout: "layouts/modern-dashboard",
                currentPage: "links",
                user: req.user,
                links: [],
                stats: {
                    totalLinks: 0,
                    totalClicks: 0
                }
            });
        }
    }
);

// Analytics page
router.get(
    "/analytics",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    async(req, res) => {
        try {
            // Try optimized analytics service first
            const analyticsService = require("../services/analytics/analytics.service");
            const analyticsData = await analyticsService.getAnalyticsPageData(req.user.id);

            console.log(`📊 Analytics page loaded for user ${req.user.id}:`, {
                totalDrops: analyticsData.stats.totalDrops,
                activeDrops: analyticsData.stats.activeDrops,
                totalLinks: analyticsData.stats.totalLinks,
                totalFans: analyticsData.stats.totalFans,
                totalClicks: analyticsData.stats.totalClicks,
                recentFanSignups: analyticsData.fanAnalytics.fans.length,
                cached: analyticsData.lastUpdated
            });

            res.render("modern-analytics", {
                title: "Analytics",
                pageTitle: "Analytics",
                layout: "layouts/modern-dashboard",
                currentPage: "analytics",
                user: req.user,
                stats: analyticsData.stats,
                recentEvents: analyticsData.recentEvents,
                recentLinks: analyticsData.recentLinks,
                fanAnalytics: analyticsData.fanAnalytics,
                performanceMetrics: analyticsData.performanceMetrics,
                lastUpdated: analyticsData.lastUpdated
            });
        } catch (analyticsError) {
            console.error('❌ Analytics service error, falling back to direct queries:', analyticsError);

            try {
                // Fallback to direct database queries
                const query = require("../queries");

                // Get analytics data using existing functions
                const recentEvents = await query.event.findByUserWithStats(req.user.id, { limit: 10 });
                const recentLinks = await query.link.get({ "links.user_id": req.user.id }, { skip: 0, limit: 10 });

                // Get recent fan signups for analytics page
                const fanAnalytics = await query.event.getFanAnalytics(req.user.id, { limit: 50 }).catch(err => {
                    console.error('❌ Error getting fan analytics:', err);
                    return { fans: [], totalCount: 0 };
                });

                // Calculate stats from actual data
                const totalEvents = recentEvents.length;
                const activeEvents = recentEvents.filter(event => event.is_active).length;
                const totalLinks = recentLinks.length;
                const totalFans = recentEvents.reduce((sum, event) => sum + (event.signup_count || 0), 0);
                const totalClicks = recentLinks.reduce((sum, link) => sum + (link.visit_count || 0), 0);

                console.log(`📊 Analytics fallback loaded for user ${req.user.id}:`, {
                    totalEvents,
                    activeEvents,
                    totalLinks,
                    totalFans,
                    totalClicks,
                    recentFanSignups: fanAnalytics.fans.length
                });

                res.render("modern-analytics", {
                    title: "Analytics",
                    pageTitle: "Analytics",
                    layout: "layouts/modern-dashboard",
                    currentPage: "analytics",
                    user: req.user,
                    stats: {
                        totalEvents: totalEvents || 0,
                        activeEvents: activeEvents || 0,
                        totalLinks: totalLinks || 0,
                        totalFans: totalFans || 0,
                        totalClicks: totalClicks || 0
                    },
                    recentEvents: recentEvents || [],
                    recentLinks: recentLinks || [],
                    fanAnalytics: fanAnalytics || { fans: [], totalCount: 0 }
                });
            } catch (fallbackError) {
                console.error('❌ Fallback analytics error:', fallbackError);

                res.render("modern-analytics", {
                    title: "Analytics",
                    pageTitle: "Analytics",
                    layout: "layouts/modern-dashboard",
                    currentPage: "analytics",
                    user: req.user,
                    stats: {
                        totalDrops: 0,
                        activeDrops: 0,
                        totalLinks: 0,
                        totalFans: 0,
                        totalClicks: 0
                    },
                    recentEvents: [],
                    recentLinks: [],
                    fanAnalytics: { fans: [], totalCount: 0 },
                    error: "Failed to load analytics data"
                });
            }
        }
    }
);

router.get(
    "/dashboard/messages",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    (req, res) => {
        const messages = [{
                id: 1,
                subject: "Welcome to JERSEY LOVES BASS",
                preview: "Thanks for joining! Get ready for an amazing experience...",
                status: "sent",
                recipientCount: 1247,
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                id: 2,
                subject: "JULY 4TH PRESALE Announcement",
                preview: "Big news! Our July 4th presale is coming soon...",
                status: "scheduled",
                recipientCount: 1500,
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
            }
        ];

        res.render("messages", {
            title: "Messages - BOUNCE2BOUNCE",
            layout: "layouts/modern-dashboard",
            currentPage: "messages",
            stats: {
                totalMessages: 12,
                deliveryRate: 98.5,
                openRate: 76.3,
                totalRecipients: 1247
            },
            messages: messages
        });
    }
);

router.get(
    "/dashboard/fans",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    (req, res) => {
        const fans = [{
                id: 1,
                name: "Alex Johnson",
                email: "alex@example.com",
                phone: "+1 (555) 123-4567",
                location: { city: "New York", state: "NY" },
                joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                acquisitionChannel: "drop",
                rsvpCount: 3,
                status: "active"
            },
            {
                id: 2,
                name: "Sarah Williams",
                email: "sarah@example.com",
                phone: "+1 (555) 987-6543",
                location: { city: "Los Angeles", state: "CA" },
                joinedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
                acquisitionChannel: "social",
                rsvpCount: 1,
                status: "active"
            },
            {
                id: 3,
                name: "Mike Chen",
                email: "mike@example.com",
                location: { city: "Chicago", state: "IL" },
                joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                acquisitionChannel: "referral",
                rsvpCount: 2,
                status: "new"
            }
        ];

        res.render("fans", {
            title: "Fans - BOUNCE2BOUNCE",
            layout: "layouts/modern-dashboard",
            currentPage: "fans",
            stats: {
                totalFans: 1247,
                newFansThisWeek: 23,
                engagementRate: 76.3,
                avgResponseTime: "2.3h"
            },
            fans: fans,
            pagination: {
                start: 1,
                end: 3,
                total: 1247,
                hasPrev: false,
                hasNext: true,
                nextPage: 2
            }
        });
    }
);

// Legacy /settings route - redirects to modern dashboard settings
router.get(
    "/settings",
    (req, res) => {
        res.redirect(301, "/dashboard/settings");
    }
);

// Backward compatibility redirects - redirect old URLs to new nested structure
router.get("/admin", (req, res) => res.redirect(301, "/dashboard/admin"));
router.get("/contact-book", (req, res) => res.redirect(301, "/dashboard/users"));
// ✅ SEO FIX: Removed /events redirect - already handled above (removed entirely to prevent Google Search Console errors)
router.get("/stats", (req, res) => res.redirect(301, "/dashboard/stats"));
router.get("/home-editor", (req, res) => res.redirect(301, "/dashboard/home-editor"));
router.get("/settings", (req, res) => res.redirect(301, "/dashboard/settings"));
router.get("/messages", (req, res) => res.redirect(301, "/dashboard/messages"));
router.get("/fans", (req, res) => res.redirect(301, "/dashboard/fans"));

// Redirect old admin table endpoints
router.get("/admin/links/table", (req, res) => res.redirect(301, "/dashboard/admin/links/table"));
router.get("/admin/users/table", (req, res) => res.redirect(301, "/dashboard/admin/users/table"));
router.get("/admin/domains/table", (req, res) => res.redirect(301, "/dashboard/admin/domains/table"));
router.get("/admin/home-settings/table", (req, res) => res.redirect(301, "/dashboard/admin/home-settings/table"));
router.get("/admin/link/edit/:id", (req, res) => res.redirect(301, `/dashboard/admin/link/edit/${req.params.id}`));

// Redirect old events edit route
router.get("/events/:id/edit", (req, res) => res.redirect(301, `/dashboard/events/${req.params.id}/edit`));

// Redirect old events create route
router.get("/events/create", (req, res) => res.redirect(301, "/dashboard/events/create"));

// SEO Routes - XML Sitemap, Robots.txt, and AI/LLM Discovery
router.get("/sitemap.xml", asyncHandler(sitemap.generateSitemap));
router.get("/robots.txt", asyncHandler(sitemap.generateRobotsTxt));
router.get("/llms.txt", (req, res) => {
    res.set({
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    });
    res.sendFile('llms.txt', { root: './static' });
});

// SEO Monitoring and Testing Routes
router.get("/seo/report", asyncHandler(seoMonitoring.generateSEOReport));
// Express 5.x compatible routes - separate routes for optional parameter
router.get("/seo/test", asyncHandler(seoMonitoring.testSEOElements));
router.get("/seo/test/:element", asyncHandler(seoMonitoring.testSEOElements));
router.get("/seo/analytics", asyncHandler(seoMonitoring.getSEOAnalytics));

module.exports = router;