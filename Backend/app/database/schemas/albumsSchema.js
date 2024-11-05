const albumsSchema = (knex) => (table) => {
  table.bigIncrements('id').primary();
  table.text('title').notNullable().checkLength('<=', 255);
  table.bigInteger('artist_id').unsigned().references('id').inTable('artists').onDelete('CASCADE');
  table.date('release_date');
  table.text('image_url');
  table.timestamp(true, true);
  
  table.foreign('artist_id').references('id').inTable('music_schema.artists').onDelete('CASCADE');
};

module.exports = albumsSchema;
