const playlistService = require('../services/playlistService');

// === Auxiliares de duración ===
const convertHMSToSeconds = (duration) => {
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const convertSecondsToHMS = (seconds) => ({
  hours: Math.floor(seconds / 3600),
  minutes: Math.floor((seconds % 3600) / 60),
  seconds: seconds % 60,
});

const formatDurationAsString = (duration) => {
  const hours = duration.hours.toString().padStart(2, '0');
  const minutes = duration.minutes.toString().padStart(2, '0');
  const seconds = duration.seconds.toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

// === CRUD Playlists ===
const createPlaylist = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const userId = Number(req.user.id);
    const playlist = await playlistService.createPlaylist(userId, name, imageUrl);
    res.status(201).json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserPlaylists = async (req, res) => {
  try {
    const playlists = await playlistService.getUserPlaylists(req.user.id);
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const playlist = await playlistService.getPlaylistById(req.user.id, req.params.id);
    if (!playlist) return res.status(404).json({ error: "Playlist no encontrada" });
    res.json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    if (!name && !imageUrl) return res.status(400).json({ error: 'Debes enviar al menos un campo' });
    const updated = await playlistService.updatePlaylist(req.user.id, req.params.id, name, imageUrl);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    await playlistService.deletePlaylist(req.user.id, req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// === Canciones dentro de playlists ===
const getSongs = async (req, res) => {
  try {
    const songs = await playlistService.getSongs(req.params.id);
    res.json(songs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addSongToPlaylist = async (req, res) => {
  try {
    await playlistService.addSong(req.params.id, req.body.songId);
    res.status(201).json({ message: "Song added" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeSongFromPlaylist = async (req, res) => {
  try {
    await playlistService.removeSong(req.params.id, req.body.songId);
    res.json({ message: "Song removed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  getSongs,
  addSongToPlaylist,
  removeSongFromPlaylist,
};
