// Define el esquema para la tabla de usuarios
const usersSchema = (table) => {
  table.increments('id').primary(); // Columna de ID autoincremental
  table.string('email').notNullable().unique(); // Columna de correo electrónico
  table.string('username').notNullable().unique(); // Columna de nombre de usuario
  table.string('password').notNullable(); // Columna de contraseña
  table.timestamps(true, true); // Columnas de registro de tiempo (creación y actualización)
};

module.exports = usersSchema;
