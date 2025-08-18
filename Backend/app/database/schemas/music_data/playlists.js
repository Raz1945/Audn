const knex = require('knex');

const createPlaylistsTable = (table) => {
  table.bigIncrements('id').primary();
  table.string('name', 255).notNullable();
  table
    .bigInteger('user_id')
    .unsigned()
    .references('id')
    .inTable('user_data.users') 
    .onDelete('CASCADE');
  table.text('image_url');
  table.timestamps(true, true);
};

module.exports = createPlaylistsTable;
