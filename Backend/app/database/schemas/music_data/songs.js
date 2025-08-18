const knex = require('knex');  

const createSongsTable = (table) => {
    table.bigIncrements('id').primary();
    table.string('title', 255).notNullable();
    table.time('duration').notNullable();
    table
      .bigInteger('album_id')
      .unsigned()
      .references('id')
      .inTable('music_data.albums')
      .onDelete('CASCADE');
    table
      .bigInteger('artist_id')
      .unsigned()
      .references('id')
      .inTable('music_data.artists')
      .onDelete('CASCADE');
    table.integer('rating').checkBetween([0, 5]);
    table
      .bigInteger('genre_id')
      .unsigned()
      .references('id')
      .inTable('music_data.genres')
      .onDelete('CASCADE');
    table.text('image_url');
    table.timestamps(true, true);
};

module.exports = createSongsTable;
