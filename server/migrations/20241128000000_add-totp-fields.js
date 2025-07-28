/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function up(knex) {
  const hasTotp = await knex.schema.hasColumn("users", "totp_secret");
  if (!hasTotp) {
    await knex.schema.alterTable("users", table => {
      table.string("totp_secret").nullable(); // Base32 encoded TOTP secret
      table.boolean("totp_enabled").defaultTo(false); // Whether TOTP is enabled for this user
      table.timestamp("totp_setup_at").nullable(); // When TOTP was first set up
      table.timestamp("totp_last_used").nullable(); // Last time TOTP was used (prevent replay)
    });
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function down(knex) {
  await knex.schema.alterTable("users", table => {
    table.dropColumn("totp_secret");
    table.dropColumn("totp_enabled");
    table.dropColumn("totp_setup_at");
    table.dropColumn("totp_last_used");
  });
}

module.exports = { up, down };
