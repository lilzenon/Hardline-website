console.log('🔍 Starting CLEAN routes.js imports...');
console.log('🚨 FIXED: CLEAN ROUTES.JS - PATH-TO-REGEXP ERROR RESOLVED!');

const { Router } = require("express");
console.log('✅ Express Router imported');

const locals = require("./../handlers/locals.handler");
console.log('✅ Locals handler imported');

console.log('🔍 About to import renders routes...');
const renders = require("./renders.routes");
console.log('✅ Renders routes imported');

console.log('🔍 About to import domains routes...');
const domains = require("./domain.routes");
console.log('✅ Domains routes imported');

console.log('🔍 About to import health routes...');
const health = require("./health.routes");
console.log('✅ Health routes imported');

console.log('🔍 About to import link routes...');
const links = require("./link.routes");
console.log('✅ Link routes imported');

console.log('🔍 About to import auth routes...');
const auth = require("./auth.routes");
console.log('✅ Auth routes imported');

console.log('🔍 About to import user routes...');
const users = require("./user.routes");
console.log('✅ User routes imported');

console.log('🔍 About to import admin auth routes...');
const adminAuth = require("./admin-auth.routes");
console.log('✅ Admin auth routes imported');

console.log('🔍 About to import public events routes...');
const publicEvents = require("./public_events.routes");
console.log('✅ Public events routes imported');

console.log('🔍 About to import QR routes...');
const qrRoutes = require("./qr.routes");
console.log('✅ QR routes imported');

console.log('🔍 About to import events routes...');
const events = require("./events.routes");
console.log('✅ Events routes imported');

console.log('🔍 About to import SMS routes...');
const sms = require("./sms.routes");
console.log('✅ SMS routes imported');

console.log('🔍 About to require contact-book routes...');
const contactBook = require("./api/contact-book.routes");
console.log('✅ Contact-book routes loaded');

console.log('🔍 About to require images.routes (DB-backed image server)...');
const imagesDB = require("./images.routes");
console.log('✅ images.routes (DB-backed) loaded');

console.log('🔍 About to require images.route (static optimizer/proxy)...');
const imagesOptim = require("./images.route");
console.log('✅ images.route (optimizer) loaded');

const homeSettings = require("./home_settings.routes");
const monitoring = require("./monitoring.routes");
const sessionAdmin = require("./admin/session-admin.routes");
const privacy = require("./privacy.routes");
// Note: integrations routes migrated to dashboard
const seoTest = require("./seo-test.routes");
const webhooks = require("./webhooks.routes");

const renderRouter = Router();
renderRouter.use(renders);
renderRouter.use(adminAuth);
renderRouter.use("/event", publicEvents);

// QR code redirect route - dedicated router for /qr/:identifier URLs
renderRouter.use("/qr", qrRoutes);

const apiRouter = Router();
apiRouter.use("/auth", auth);
apiRouter.use("/users", users);
apiRouter.use("/domains", domains);
apiRouter.use("/health", health);
apiRouter.use("/links", links);
apiRouter.use("/events", events);
apiRouter.use("/sms", sms);
apiRouter.use("/contact-book", contactBook);
// Mount DB-backed image routes first (serve/upload/debug)
apiRouter.use("/images", imagesDB);
// Mount static optimizer/proxy routes second (optimized/srcset/proxy-optimized)
apiRouter.use("/images", imagesOptim);
apiRouter.use("/home-settings", homeSettings);
apiRouter.use("/monitoring", monitoring);
apiRouter.use("/visit-health", require("./visit-health.routes"));
apiRouter.use("/admin/sessions", sessionAdmin);
apiRouter.use("/privacy", privacy);
// Note: /integrations routes migrated to dashboard
apiRouter.use("/webhooks", webhooks);
apiRouter.use("/seo-test", seoTest);

module.exports = {
    api: apiRouter,
    render: renderRouter,
};