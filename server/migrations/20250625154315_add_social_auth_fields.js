/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('users', function(table) {
        // Add social authentication fields
        table.string('google_id').nullable().unique();
        table.string('apple_id').nullable().unique();
        table.string('provider').nullable(); // 'local', 'google', 'apple', or combination like 'local,google'

        // Make password nullable for social auth users
        table.string('password').nullable().alter();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('users', function(table) {
        // Remove social authentication fields
        table.dropColumn('google_id');
        table.dropColumn('apple_id');
        table.dropColumn('provider');

        // Make password required again
        table.string('password').notNullable().alter();
    });
};