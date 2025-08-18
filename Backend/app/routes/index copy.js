const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const musicController = require('../controllers/musicController');

const playlistController = require('../controllers/playlistController');
const authenticateToken = require('../middleware/authMiddleware');


// Registro y login
  // http://localhost:3000/register
router.post('/register', userController.register);
  // http://localhost:3000/login
router.post('/login', userController.login);
  // http://localhost:3000/recovery
router.post('/recovery', userController.recovery);


// Musica
  // http://localhost:3000/flow/artists
router.get('/flow/artists', musicController.getAllArtists);
  // http://localhost:3000/flow/songs
router.get('/flow/songs', musicController.getAllSongs);


// Playlists
  // http://localhost:3000/flow/pl
router.get('/flow/pl', authenticateToken, playlistController.getUserPlaylist);


// Testeo que haya conexcion 
  // http://localhost:3000/ping
router.get('/ping', (_req, res) => {
  console.log('ROUTES: someone pinged here!! ');
  res.send('pong pong');
});

module.exports = router;
