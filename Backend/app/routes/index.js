const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const musicRoutes = require('./musicRoutes');
const playlistRoutes = require('./playlistRoutes');
const searchRoutes = require('../routes/searchRoutes');

// Usuario
router.use('/', userRoutes);

// Todo 
// Se podria crear distintos endpoints para los datos del usuario

// Musica
router.use('/', musicRoutes);

// Playlists
router.use('/', playlistRoutes);

// Rutas de búsqueda
router.use('/', searchRoutes);


// Test 
router.get('/ping', (_req, res) => {
  console.log('ROUTES: someone pinged here!! ');
  res.send('pong pong');
});

// TODO - Agregar rutas para obtener la imagen de la playlist
// TODO - Agregar rutas para obtener la imagen de la artista en la playlist
// TODO - Agregar rutas para obtener el total de tiempo de las canciones de una playlist
// TODO - Agregar rutas para copiar una playlist (crear una nueva playlist con las canciones de otra playlist)


//TODO Hay que agregar rutas para manejar errores 404 y 500
// 404 - Not Found  y 500 - Internal Server Error

module.exports = router;
