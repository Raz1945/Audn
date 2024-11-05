const artistsSchema = (knex) => (table) => {
  table.bigIncrements('id').primary();
  table.text('name').notNullable();
  table.bigInteger('genre_id').unsigned().references('id').inTable('genres').onDelete('CASCADE');
  table.text('image_url');
  table.timestamps(true, true);
};

module.exports = artistsSchema;