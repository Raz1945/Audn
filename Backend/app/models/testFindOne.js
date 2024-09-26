const { findOne } = require('./userSchema'); // Asegúrate de que la ruta sea correcta

const testFindOne = async (userIdentifier) => {
  try {
    const user = await findOne(userIdentifier);
    console.log('Usuario encontrado:', user);
  } catch (error) {
    console.error('Error al probar findOne:', error);
  }
};

// Prueba con un nombre de usuario o correo electrónico existente
testFindOne('test@mail.com'); // Cambia 'testuser' por el nombre de usuario o correo que estás usando
