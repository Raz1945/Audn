const knex = require('../database/config/db');

// Verifica si existe el usuario
const findOne = async (data) => {
  const userExists = await knex
    .select('*')
    .from('users')
    .where('email', data.email)
    .first();
  return userExists;
};

// Crea un usuario
const create = async (data) => {
  const newUser = await knex
    .insert({
      email: data.email,
      username: data.username,
      password: data.password,
    })
    .into('users') 
    .returning('*');

  return newUser;
};

module.exports = { create, findOne };
