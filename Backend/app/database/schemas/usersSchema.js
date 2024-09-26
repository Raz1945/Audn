// Define el esquema para la tabla de usuarios
const usersSchema = (table) => {
  table.increments('id').primary(); 
  table.string('email').notNullable().unique(); 
  table.string('username').notNullable().unique(); 
  table.string('password').notNullable();
  table.timestamps(true, true);
};

module.exports = usersSchema;
