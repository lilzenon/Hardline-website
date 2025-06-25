const models = require("../models");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await models.createEventTable(knex);
    await models.createEventSignupTable(knex);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('event_signups')
        .then(() => knex.schema.dropTableIfExists('events'));
};