const knex = require('../database/config/db');

// Verifica si existe el usuario según el identificador proporcionado (username o email)
const findOne = async (userIdentifier) => {
  if (!userIdentifier) {
    throw new Error('El identificador de usuario es obligatorio.');
  }

  try {
    return await knex('user_data.users')
      .select('*')
      .where((builder) => {
        builder.where('username', userIdentifier).orWhere('email', userIdentifier);
      })
      .first();
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    throw new Error('Error al buscar la información del usuario.');
  }
};

// Verifica si existe el usuario y retorna el email según el identificador proporcionado
const findUserEmail = async (userIdentifier) => {
  if (!userIdentifier) {
    throw new Error('El identificador de usuario es obligatorio.');
  }

  try {
    const user = await knex('user_data.users')
      .select('email')
      .where((builder) => {
        builder.where('username', userIdentifier).orWhere('email', userIdentifier);
      })
      .first();

    if (!user) {
      throw new Error('Usuario no encontrado.');
    }

    return user.email;
  } catch (error) {
    console.error('Error al buscar el correo del usuario:', error);
    throw new Error('Error al obtener el correo del usuario.');
  }
};

// Crea un nuevo usuario
const create = async (data) => {
  const { email, username, password } = data;

  // Validar los campos obligatorios
  if (!email || !username || !password) {
    throw new Error('El correo, nombre de usuario y contraseña son obligatorios.');
  }

  try {
    const [newUser] = await knex('user_data.users')
      .insert({
        email,
        username,
        password,
      })
      .returning('*');

    return newUser;
  } catch (error) {
    // Manejo de errores específicos para claves únicas
    if (error.code === '23505') {
      const campo = error.detail.includes('email') ? 'El correo' : 'El nombre de usuario';
      throw new Error(`${campo} ya está registrado.`);
    }

    console.error('Error al crear el usuario:', error);
    throw new Error('Error al registrar el usuario.');
  }
};

module.exports = { create, findOne, findUserEmail };
