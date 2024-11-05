const genresSchema = (knex) => (table) => {
  table.bigIncrements('id').primary();
  table.string('name', 255).unique().notNullable();
};

module.exports = genresSchema;
