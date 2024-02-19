const usersSchema = require('../schemas/usersSchema');

exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    usersSchema(table); // Llama al esquema para crear la tabla
  });
};

exports.down = async (knex) => {
  const tableExists = await knex.schema.hasTable('users');
  if (tableExists) {
    await knex.schema.dropTable('users'); // Elimina la tabla si existe
  }
};
