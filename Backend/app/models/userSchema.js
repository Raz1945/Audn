const knex = require('../database/config/db');

// Verifica si existe el usuario según el correo electrónico o nombre de usuario proporcionado.
const findOne = async (data) => {
  try {
    let userExists;
    
    if (data.$or) {
      // Extraer las condiciones de búsqueda del objeto $or
      const { username, email } = data.$or[0];

      if (username) {
        // Buscar por nombre de usuario
        userExists = await knex
          .select('*')
          .from('users')
          .where('username', username)
          .first();
      } else if (email) {
        // Buscar por correo electrónico
        userExists = await knex
          .select('*')
          .from('users')
          .where('email', email)
          .first();
      }
    }

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
