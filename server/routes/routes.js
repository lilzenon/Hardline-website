const { Router } = require("express");

console.log('🚀🚀🚀 ROUTES.JS LOADING AT:', new Date().toISOString());
console.log('🚀🚀🚀 THIS IS THE CORRECT ROUTES FILE!');
console.log('🚀🚀🚀 Routes.js loading at:', new Date().toISOString());

const helpers = require("./../handlers/helpers.handler");
const locals = require("./../handlers/locals.handler");
const renders = require("./renders.routes");
const domains = require("./domain.routes");
const health = require("./health.routes");
const link = require("./link.routes");
const user = require("./user.routes");
const auth = require("./auth.routes");
const adminAuth = require("./admin-auth.routes");
const events = require("./events.routes");
const publicEvents = require("./public_events.routes");
const qrRoutes = require("./qr.routes");
const sms = require("./sms.routes");
console.log('🔄 Loading analytics routes...');
const analytics = require("./api/analytics.routes");
console.log('✅ Analytics routes loaded');
const testRoutes = require("./api/test-routes");
console.log('✅ Test routes loaded');
const debugTestRoutes = require("./api/debug-test.routes");
console.log('✅ Debug test routes loaded');
const contactBook = require("./api/contact-book.routes");
const homeSettings = require("./home_settings.routes");
const monitoring = require("./monitoring.routes");
const sessionAdmin = require("./admin/session-admin.routes");
const privacy = require("./privacy.routes");
const integrations = require("./integrations.routes");
const webhooks = require("./webhooks.routes");
console.log('🔍 Loading settings routes...');
const settings = require("./api/settings.routes");
console.log('✅ Settings routes loaded successfully');

const renderRouter = Router();
renderRouter.use(renders);
renderRouter.use(adminAuth);
renderRouter.use("/event", publicEvents);

// QR code redirect route - dedicated router for /qr/:identifier URLs
renderRouter.use("/qr", qrRoutes);

const apiRouter = Router();
apiRouter.use(locals.noLayout);
apiRouter.use("/domains", domains);
apiRouter.use("/health", health);
apiRouter.use("/links", link);
apiRouter.use("/users", user);
apiRouter.use("/auth", auth);
apiRouter.use("/auth", adminAuth);
apiRouter.use("/events", events);
apiRouter.use("/sms", sms);
apiRouter.use("/analytics", analytics);
apiRouter.use("/test", testRoutes);
apiRouter.use("/debug-test", debugTestRoutes);
apiRouter.use("/contact-book", contactBook);
apiRouter.use("/home-settings", homeSettings);
apiRouter.use("/monitoring", monitoring);
apiRouter.use("/admin/sessions", sessionAdmin);
apiRouter.use("/privacy", privacy);
apiRouter.use("/integrations", integrations);
apiRouter.use("/webhooks", webhooks);
apiRouter.use("/settings", settings);
apiRouter.use("/upload", settings); // For image uploads

module.exports = {
    api: apiRouter,
    render: renderRouter,
};