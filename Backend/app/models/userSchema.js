const knex = require('../database/config/db');

// Verifica si existe el usuario según el userIdentifier proporcionado
const findOne = async (userIdentifier) => {
  try {
    if (!userIdentifier) {
      throw new Error('User identifier is required');
    }

    const userExists = await knex('users')
      .select('*')
      .where(function() {
        this.where('username', userIdentifier)
            .orWhere('email', userIdentifier);
      })
      .first();

    return userExists;
  } catch (error) {
    console.error('Error al buscar usuario:', error);
    throw error;
  }
};

// Crea un usuario
const create = async (data) => {
  try {
    const newUser = await knex
      .insert({
        email: data.email,
        username: data.username,
        password: data.password,
      })
      .into('users')
      .returning('*');
    return newUser;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

module.exports = { create, findOne };
