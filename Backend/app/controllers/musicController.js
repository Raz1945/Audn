const musicService = require('../services/musicService');

const getAllMusic = async (_req, res) => {
  try {
    const data = await musicService.getAllMusic();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener artistas random
const getRandomArtists = async (_req, res) => {
  try {
    const artists = await musicService.getRandomArtists();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getArtistSongs = async (req, res) => {
  try {
    const songs = await musicService.getArtistSongs(req.params.id);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMusic,
  getRandomArtists,
  getArtistSongs,
};
