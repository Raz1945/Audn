const playlistsSchema = (knex) => (table) => {
  table.bigIncrements('id').primary();
  table.text('name').notNullable().checkLength('<=', 255);
  table.bigInteger('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
  table.text('image_url');
  table.timestamp(true, tr);
};

module.exports = playlistsSchema;