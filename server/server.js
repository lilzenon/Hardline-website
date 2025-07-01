const env = require("./env");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const express = require("express");
const helmet = require("helmet");
const path = require("node:path");
const hbs = require("hbs");

// Session store service
const sessionStore = require("./services/session/session-store.service");
const sessionSecurity = require("./services/session/session-security.service");

const helpers = require("./handlers/helpers.handler");
const renders = require("./handlers/renders.handler");
const asyncHandler = require("./utils/asyncHandler");
const locals = require("./handlers/locals.handler");
const links = require("./handlers/links.handler");
const routes = require("./routes");
const utils = require("./utils");
const { initializePrivacySystem } = require("./middleware/privacy.middleware");


// run the cron jobs
// the app might be running in cluster mode (multiple instances) so run the cron job only on one cluster (the first one)
// NODE_APP_INSTANCE variable is added by pm2 automatically, if you're using something else to cluster your app, then make sure to set this variable
if (env.NODE_APP_INSTANCE === 0) {
    require("./cron");
}

// intialize passport authentication library
require("./passport");

// create express app
const app = express();

// this tells the express app that it's running behind a proxy server
// and thus it should get the IP address from the proxy server
if (env.TRUST_PROXY) {
    app.set("trust proxy", true);
}

app.use(helmet({
    contentSecurityPolicy: false,
    frameguard: false // Disable frameguard to allow custom X-Frame-Options handling
}));
app.use(cookieParser());

// Production-ready session configuration with Redis store
app.use(session(sessionStore.getSessionConfig()));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static
app.use("/images", express.static("custom/images"));
app.use("/css", express.static("custom/css", { extensions: ["css"] }));
app.use(express.static("static"));

// Session security middleware - disabled in development to prevent blocking during testing
if (env.NODE_ENV === 'production') {
    app.use(sessionSecurity.securityMiddleware());
}

app.use(passport.initialize());
app.use(locals.isHTML);
app.use(locals.config);

// template engine / serve html

app.set("view engine", "hbs");
app.set("views", [
    path.join(__dirname, "../custom/views"),
    path.join(__dirname, "views"),
]);
utils.registerHandlebarsHelpers();

// if is custom domain, redirect to the set homepage
app.use(asyncHandler(links.redirectCustomDomainHomepage));

// render html pages
app.use("/", routes.render);

// handle api requests
app.use("/api/v2", routes.api);
app.use("/api", routes.api);

// finally, redirect the short link to the target
app.get("/:id", asyncHandler(links.redirect));

// 404 pages that don't exist
app.get("*", renders.notFound);

// handle errors coming from above routes
app.use(helpers.error);

// Initialize privacy-compliant tracking system
initializePrivacySystem();

app.listen(env.PORT, () => {
    console.log(`> Ready on http://localhost:${env.PORT}`);
});