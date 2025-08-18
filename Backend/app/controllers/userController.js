require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../services/userService');

// Crear un nuevo usuario
const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already registered');
      return res.status(409).json({ error: 'Registration error' });
    }

    // Genera un hash para la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crea un nuevo usuario
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error, please try again' });
  }
};

// Iniciar sesión de usuario
const login = async (req, res) => {
  try {
    const { userIdentifier, password } = req.body;

    // Validar que userIdentifier y password estén presentes
    if (!userIdentifier || !password) {
      return res.status(400).json({ message: 'Credenciales incompletas' });
    }

    //todo A eliminar -> Logs Sensibles
    // console.log('Buscando usuario con identifier:', userIdentifier);

    // Buscar al usuario usando la función findOne
    const user = await User.findOne(userIdentifier);

    //todo A eliminar -> Logs Sensibles
    // console.log('Usuario encontrado:', user);

    // Verificar si el usuario existe y la contraseña es correcta
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Mensaje genérico para evitar revelar información sensible
      return res
        .status(401)
        .json({ message: 'Usuario o contraseña inválidos' });
    }

    // Generar un token JWT
    const accessToken = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        is_premium: user.is_premium,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION_TIME }
    );

    //todo A eliminar -> Logs Sensibles
    // console.log('Token generado:', accessToken);

    // Responder con el Token JWT
    res.status(200).json({
      accessToken,
      id: user.id,
      username: user.username,
      email: user.email,
      is_premium: user.is_premium,
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    // Mensaje genérico para errores internos del servidor
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Controlador de recuperación de contraseña
const recovery = async (req, res) => {
  try {
    const { userIdentifier } = req.body;

    if (!userIdentifier) {
      return res
        .status(400)
        .json({ message: 'El identificador de usuario es requerido' });
    }

    const email = await User.findUserEmail(userIdentifier);

    if (!email) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // todo ELIMINAR
    console.log(`Simulación de envío de email a: ${email}`);

    res.status(200).json({ email });
  } catch (error) {
    console.error('Error en la recuperación de contraseña:', error);
    res
      .status(500)
      .json({ message: 'Error en el servidor, intenta nuevamente' });
  }
};

//? Que puede hacer un usuario?
// Crear una playlist
// Agreaga una/s cancion a una playlist
// Eliminar una/s cancion de una playlist

module.exports = { register, login, recovery };
