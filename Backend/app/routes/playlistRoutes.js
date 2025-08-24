const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");
const authenticateToken = require("../middleware/authMiddleware");

// ====================================
// RUTAS DE PLAYLISTS (/flow/pl)
// ====================================

//* Crear playlist vacia
router.post("/flow/pl", authenticateToken, playlistController.createPlaylist);

//* Crear playlist con los artistas seleccionados en Cupido Musical
router.post("/flow/pl/cupido", authenticateToken, playlistController.createCupidoPlaylist);

//* Obtener todas las playlists del usuario
router.get("/flow/pl", authenticateToken, playlistController.getUserPlaylists);

//* Obtener playlist segun la ID de la playlist
router.get("/flow/pl/:id", authenticateToken, playlistController.getPlaylistById);

//* Actualizar el nombre i/o la imagen de playlist
router.patch("/flow/pl/:id", authenticateToken, playlistController.updatePlaylist);

//* Eliminar playlist segun el ID de la playlist
router.delete("/flow/pl/:id", authenticateToken, playlistController.deletePlaylist);

// ====================================
// RUTAS DE CANCIONES DENTRO DE PLAYLISTS
// ====================================

//* Obtener todas las  canciones de una playlist
router.get("/flow/pl/:id/songs", authenticateToken, playlistController.getSongs);

//* Agregar canción a una playlist
router.post("/flow/pl/:id/songs", authenticateToken, playlistController.addSongToPlaylist);

//* Remover canción de una playlist
router.delete("/flow/pl/:id/songs", authenticateToken, playlistController.removeSongFromPlaylist);

module.exports = router;
