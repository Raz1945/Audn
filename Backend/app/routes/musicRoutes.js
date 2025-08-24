const express = require("express");
const router = express.Router();
const musicController = require("../controllers/musicController");

// GET /flow/music → obtiene toda la información musical
router.get("/flow/music", musicController.getAllMusic);

// GET /flow/artists → obtiene hasta 15 artistas random
router.get("/flow/artists", musicController.getRandomArtists);

// Canciones de un artista
router.get("/flow/artists/:id/songs", musicController.getArtistSongs);


module.exports = router;
