const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const playlistRoutes = require('./playlistRoutes');

const searchRoutes = require('../routes/searchRoutes');

// Usuario
router.use('/', userRoutes);

// Playlists
router.use('/', playlistRoutes);

// Rutas de búsqueda
router.use('/search', searchRoutes);


// Testeo que haya conexcion 
router.get('/ping', (_req, res) => {
  console.log('ROUTES: someone pinged here!! ');
  res.send('pong pong');
});

module.exports = router;
