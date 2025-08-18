const knex = require('knex');  

const createArtistsTable = (table) => {
      table.bigIncrements('id').primary();
      table.string('name', 255).notNullable();
      table
        .bigInteger('genre_id')
        .unsigned()
        .references('id')
        .inTable('music_data.genres')
        .onDelete('CASCADE');
      table.text('image_url');
      table.timestamps(true, true);
};

module.exports = createArtistsTable;
