// Define el esquema para la tabla de playlist
const playlistSchema = (table) => {
  table.increments('id').primary();
  table.string('title').notNullable();
  
  table.integer('user_id').unsigned().references('users.id');
};
