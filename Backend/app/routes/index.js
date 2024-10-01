const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// http://localhost:3000/register
router.post('/register', userController.register);

// http://localhost:3000/login
router.post('/login', userController.login);


// http://localhost:3000/recovery
router.post('/recovery', userController.recovery);

// Testeo que haya conexcion http://localhost:3000/ping
router.get('/ping', (_req, res) => {
  console.log('ROUTES: someone pinged here!! ');
  res.send('pong pong');
});

module.exports = router;
