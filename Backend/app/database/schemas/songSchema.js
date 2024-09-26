// Define el esquema para la tabla de canciones
const songSchema = (table) => {
  table.increements('id').primary();
  table.string('title').notNullable();
  table.string('artist').notNullable();
  table.string('album').notNullable();
  table.string('genre').notNullable();
  table.integer('duration').notNullable();
  table.integer('rating');
}

module.exports = songSchema;
