require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

exports.register = async (req, res) => {
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
