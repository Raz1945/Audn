const knex = require('knex');  

const createAlbumsTable = (table) => {
      table.bigIncrements('id').primary();
      table.string('title', 255).notNullable();
      table
        .bigInteger('artist_id')
        .unsigned()
        .references('id')
        .inTable('music_data.artists')
        .onDelete('CASCADE');
      table.date('release_date');
      table.text('image_url');
      table.timestamps(true, true);
};

module.exports = createAlbumsTable;
