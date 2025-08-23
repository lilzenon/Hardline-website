const knex = require("../../knex");
const { getDateRanges, percentChangeOrNA } = require("./time.service");

class HomepageAnalyticsService {
  async getDashboardStats(userId, period = "month") {
    const { current, previous } = getDateRanges(period);

    const [curPV, prevPV, curUV, prevUV, curSess, prevSess, mostClicked, trendRows] = await Promise.all([
      knex("homepage_page_views").whereBetween("view_timestamp", [current.start, current.end]).count({ count: "*" }).first(),
      knex("homepage_page_views").whereBetween("view_timestamp", [previous.start, previous.end]).count({ count: "*" }).first(),
      knex("homepage_page_views").whereBetween("view_timestamp", [current.start, current.end]).countDistinct({ count: "session_id" }).first(),
      knex("homepage_page_views").whereBetween("view_timestamp", [previous.start, previous.end]).countDistinct({ count: "session_id" }).first(),
      knex("homepage_sessions").whereBetween("first_visit", [current.start, current.end]).count({ count: "*" }).first(),
      knex("homepage_sessions").whereBetween("first_visit", [previous.start, previous.end]).count({ count: "*" }).first(),
      knex("homepage_link_clicks").whereBetween("click_timestamp", [current.start, current.end]).select("link_url", "link_text").count({ clicks: "*" }).groupBy("link_url", "link_text").orderBy("clicks", "desc").first(),
      knex("homepage_page_views").whereBetween("view_timestamp", [current.start, current.end]).select(knex.raw("DATE(view_timestamp) as d")).count({ views: "*" }).groupBy("d").orderBy("d", "asc"),
    ]);

    const numberOfVisitors = parseInt(curPV && (curPV.count?.count ?? curPV.count)) || 0;
    const prevNumberOfVisitors = parseInt(prevPV && (prevPV.count?.count ?? prevPV.count)) || 0;
    const totalNumberOfUsers = parseInt(curUV && (curUV.count?.count ?? curUV.count)) || 0;
    const prevTotalNumberOfUsers = parseInt(prevUV && (prevUV.count?.count ?? prevUV.count)) || 0;
    const totalSessions = parseInt(curSess && (curSess.count?.count ?? curSess.count)) || 0;
    const prevTotalSessions = parseInt(prevSess && (prevSess.count?.count ?? prevSess.count)) || 0;

    const dailyTrendData = (trendRows || []).map((r) => parseInt(r.views)).filter((n) => Number.isFinite(n));

    const mostClickedLink = mostClicked
      ? {
          title: mostClicked.link_text || mostClicked.link_url || "—",
          clicks: parseInt(mostClicked.clicks) || 0,
          address: mostClicked.link_url || "",
        }
      : { title: "No links yet", clicks: 0, address: "" };

    return {
      stats: {
        totalEvents: 0,
        activeEvents: 0,
        totalLinks: 0,
        totalClicks: 0,
        numberOfVisitors,
        mostClickedLink,
        totalNumberOfUsers,
        visitorsChange: percentChangeOrNA(numberOfVisitors, prevNumberOfVisitors),
        usersChange: percentChangeOrNA(totalNumberOfUsers, prevTotalNumberOfUsers),
        sessionsChange: percentChangeOrNA(totalSessions, prevTotalSessions),
        dailyTrendData,
        totalFans: 0,
        totalSignups: 0,
        uniqueVisitors30d: totalNumberOfUsers,
        totalPageViews30d: numberOfVisitors,
        conversionRate: 0,
        avgSessionDuration: 0,
        bounceRate: 0,
        topTrafficSources: [],
        deviceBreakdown: [],
        geoData: [],
        mostClickedDay: { day: "Monday", clicks: 0, percentage: 0 },
        eventsChange: 0,
        linksChange: 0,
        fansChange: 0,
        clicksChange: 0,
      },
      period,
      dateRange: { start: current.start, end: current.end },
      lastUpdated: new Date().toISOString(),
    };
  }

  async getVisitorsByCountry(userId, period = "month") {
    const { current } = getDateRanges(period);
    const rows = await knex("homepage_page_views").whereBetween("view_timestamp", [current.start, current.end]).whereNotNull("country_code").select("country_code").count({ visitors: "*" }).groupBy("country_code").orderBy("visitors", "desc");
    const total = rows.reduce((s, r) => s + (parseInt(r.visitors) || 0), 0) || 1;
    const coordMap = { US: [37.0902, -95.7129], CA: [56.1304, -106.3468], MX: [23.6345, -102.5528] };
    return rows.map((r) => {
      const code = r.country_code || "US";
      const visitors = parseInt(r.visitors) || 0;
      return {
        countryCode: code,
        countryName: code,
        visitors,
        percentage: Math.round((visitors / total) * 1000) / 10,
        coordinates: coordMap[code] || [37.0902, -95.7129],
      };
    });
  }

  async getVisitorChannels(userId, period = "month") {
    const { current } = getDateRanges(period);
    const refRows = await knex("homepage_page_views").whereBetween("view_timestamp", [current.start, current.end]).whereNotNull("referrer").select("referrer");

    const toHost = (ref) => {
      try {
        if (!ref) return null;
        const hasProto = /^https?:\/\//i.test(ref);
        const u = new URL(hasProto ? ref : `https://${ref}`);
        return (u.hostname || "").replace(/^www\./i, "");
      } catch (_) {
        return null;
      }
    };

    const counts = new Map();
    for (const row of refRows) {
      const host = toHost(row.referrer);
      if (!host) continue;
      counts.set(host, (counts.get(host) || 0) + 1);
    }

    const total = Array.from(counts.values()).reduce((a, b) => a + b, 0) || 1;
    const palette = ["#319DFF", "#7C3AED", "#10B981", "#F59E0B", "#EF4444", "#06B6D4"];
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([source, visitors], i) => ({
        source,
        visitors,
        percentage: Math.round((visitors / total) * 1000) / 10,
        change: 0,
        color: palette[i % palette.length],
      }));
  }

  async getSocialChannels(userId, period = "month") {
    const channels = await this.getVisitorChannels(userId, period);
    const socialHosts = [
      "facebook.com",
      "instagram.com",
      "twitter.com",
      "x.com",
      "t.co",
      "linkedin.com",
      "whatsapp.com",
      "youtube.com",
    ];
    const iconMap = {
      "facebook.com": "facebook",
      "instagram.com": "instagram",
      "twitter.com": "twitter",
      "x.com": "twitter",
      "t.co": "twitter",
      "linkedin.com": "linkedin",
      "whatsapp.com": "whatsapp",
      "youtube.com": "youtube",
    };
    return channels
      .filter((c) => socialHosts.includes(c.source || ""))
      .map((c) => ({
        platform: c.source,
        clicks: c.visitors,
        engagement: c.visitors,
        ctr: 0,
        change: 0,
        icon: iconMap[c.source] || "link",
      }));
  }
}

module.exports = new HomepageAnalyticsService();

