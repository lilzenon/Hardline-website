const env = require("../env");

const isPostgres = env.DB_CLIENT === "pg" || env.DB_CLIENT === "pg-native";

/**
 * Expression index backing the case-insensitive short-link lookup in
 * queries/link.queries.js (`WHERE LOWER(links.address) = LOWER(?)`). Without
 * it every /:id request was a sequential scan of `links`.
 *
 * Postgres only: SQLite/MySQL expression-index support differs and this app
 * runs Postgres in production; other clients are a no-op so local dev with
 * better-sqlite3 keeps migrating cleanly.
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function up(knex) {
    if (!isPostgres) return;
    await knex.raw(`CREATE INDEX IF NOT EXISTS links_address_lower_idx ON links (LOWER(address));`);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function down(knex) {
    if (!isPostgres) return;
    await knex.raw(`DROP INDEX IF EXISTS links_address_lower_idx;`);
}

module.exports = {
    up,
    down,
};
