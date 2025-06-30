const domain = require("./domain.queries");
const visit = require("./visit.queries");
const link = require("./link.queries");
const user = require("./user.queries");
const host = require("./host.queries");
const event = require("./event.queries");
const homeSettings = require("./home_settings.queries");
const seoSettings = require("./seo_settings.queries");

module.exports = {
    domain,
    event,
    host,
    homeSettings,
    link,
    seoSettings,
    user,
    visit
};