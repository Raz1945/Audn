const songsSchema = (knex) => (table) => {
  table.bigIncrements('id').primary();
  table.text('title').notNullable().checkLength('<=', 255);
  table.specificType('duration', 'interval').notNullable(); // Cambiar aquí
  table.bigInteger('album_id').unsigned().references('id').inTable('albums').onDelete('CASCADE');
  table.bigInteger('artist_id').unsigned().references('id').inTable('artists').onDelete('CASCADE');
  table.integer('rating').checkBetween([0, 5]);
  table.bigInteger('genre_id').unsigned().references('id').inTable('genres').onDelete('CASCADE');
  table.text('image_url');
  table.timestamp(true, true);
};

module.exports = songsSchema;