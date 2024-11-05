const usersSchema = (knex) => (table) => {
  table.bigIncrements('id').primary();
  table.text('username').unique().notNullable();
  table.text('email').unique().notNullable();
  table.text('password').notNullable();
  table.text('image_url');
  table.boolean('is_premium').defaultTo(false);
  table.timestamp('registration_date').defaultTo(knex.fn.now());
  table.timestamps(true, true);
};

module.exports = usersSchema;
