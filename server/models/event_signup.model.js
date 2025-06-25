async function createEventSignupTable(knex) {
    const hasTable = await knex.schema.hasTable("event_signups");
    if (!hasTable) {
        await knex.schema.createTable("event_signups", table => {
            table.increments("id").primary();
            table
                .integer("event_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("events")
                .onDelete("CASCADE");
            table.string("email", 255);
            table.string("phone", 20);
            table.string("name", 100);
            table.string("ip_address", 45);
            table.string("user_agent", 500);
            table.string("referrer", 2040);
            table.boolean("email_verified").defaultTo(false);
            table.boolean("phone_verified").defaultTo(false);
            table.boolean("notified").defaultTo(false);
            table.datetime("notified_at");
            table.timestamps(false, true);

            // Unique constraint to prevent duplicate signups
            table.unique(["event_id", "email"]);

            // Indexes for performance
            table.index(["event_id"]);
            table.index(["email"]);
            table.index(["created_at"]);
        });
    }
}

module.exports = {
    createEventSignupTable
};