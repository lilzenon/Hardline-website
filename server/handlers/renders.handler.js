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
        res.redirect("/login");
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

async function modernHomepage(req, res) {
    try {
        let events = [];
        let stats = {
            totalEvents: 0,
            activeEvents: 0,
            totalSignups: 0,
            totalViews: 0
        };

        if (req.user) {
            // Load user's events with stats for the modern homepage
            events = await query.event.findByUserWithStats(req.user.id, { limit: 8 });

            // Calculate basic stats
            stats.totalEvents = events.length;
            stats.activeEvents = events.filter(event => event.is_active).length;
            stats.totalSignups = events.reduce((sum, event) => sum + (event.signup_count || 0), 0);
            stats.totalViews = events.reduce((sum, event) => sum + (event.view_count || 0), 0);
        }

        res.render("home", {
            title: "BOUNCE2BOUNCE - Modern B2B Platform",
            pageTitle: "Home",
            layout: "layouts/home",
            events: events,
            stats: stats,
            user: req.user,
            domain: env.DEFAULT_DOMAIN,
            currentPage: "home"
        });
    } catch (error) {
        console.error('❌ Modern homepage error:', error);
        res.status(500).render("error", {
            title: "Error",
            layout: "layouts/home",
            error: "Failed to load home page"
        });
    }
}

async function login(req, res) {
    if (req.user) {
        res.redirect("/");
        return;
    }

    res.render("login", {
        title: "Log in or sign up"
    });
}

async function adminLogin(req, res) {
    if (req.user && req.user.role === 'admin') {
        res.redirect("/dashboard");
        return;
    }

    res.render("admin-login", {
        title: "Admin Login - BOUNCE2BOUNCE",
        layout: false // Use no layout for standalone admin login page
    });
}

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
        res.redirect("/login");
        return;
    }
    res.render("create_admin", {
        title: "Create admin account"
    });
}

function notFound(req, res) {
    res.render("404", {
        title: "404 - Not found"
    });
}

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
            isPreview: req.query.preview === 'true'
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
            isPreview: req.query.preview === 'true'
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

module.exports = {
    addDomainAdmin,
    addDomainForm,
    admin,
    adminLogin,
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
    modernHomepage,
    linkEdit,
    linkEditAdmin,
    login,
    logout,
    notFound,
    resetPassword,
    resetPasswordSetNewPassword,
    settings,
    stats,
    terms,
    verifyChangeEmail,
    verify,
}