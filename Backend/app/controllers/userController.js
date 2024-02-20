require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

// Crear un nuevo usuario
const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ error: 'Error, User already exists' });
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

    const message = 'User created successfully'; // Eliminar esta línea después
    res.json({ message, user: newUser }); // Eliminar esta línea después
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Iniciar sesión de usuario
const login = async (req, res) => {
  try {
    const { userIdentifier, password } = req.body;
    console.log(userIdentifier);

    const user = await User.findOne({
      $or: [{ username: userIdentifier }, { email: userIdentifier }],
    });

    // Verificar si el usuario existe y la contraseña es correcta
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ message: 'Usuario o contraseña inválidos' });
    }

    // Generar un token JWT
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });

    // Responder con el Token JWT
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res
      .status(500)
      .json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

module.exports = { register, login };
