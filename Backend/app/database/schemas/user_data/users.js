const knex = require('knex');  

const createUsersTable = (table) => {
    table.bigIncrements('id').primary();
    table.string('username', 255).unique().notNullable();
    table.string('email', 255).unique().notNullable();
    table.text('password').notNullable();
    table.text('image_url');
    table.boolean('is_premium').defaultTo(false);
    table.timestamp('registration_date');
    table.timestamps(true, true);
};

module.exports = createUsersTable;
