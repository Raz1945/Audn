const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ====================================
// RUTAS DE USUARIO 
// ====================================

//* Registro 
router.post('/register', userController.register);

//* Login
router.post('/login', userController.login);

// Recuperación de contraseña
router.post('/recovery', userController.recovery);

module.exports = router;
