const playlistModel = require('../models/playlistModel');

// === Playlists ===
async function createPlaylist(userId, name, imageUrl) {
  if (!name) throw new Error('El nombre de la playlist es obligatorio');
  const [playlist] = await playlistModel.createPlaylist(userId, name, imageUrl);
  if (!playlist) throw new Error('No se pudo crear la playlist');
  return playlist;
}

async function getUserPlaylists(userId) {
  return await playlistModel.getUserPlaylists(userId);
}

async function getPlaylistById(userId, playlistId) {
  return await playlistModel.getPlaylistById(userId, playlistId);
}

async function updatePlaylist(userId, playlistId, name, imageUrl) {
  const existing = await playlistModel.getPlaylistById(userId, playlistId);
  if (!existing) throw new Error("Playlist no encontrada o no pertenece al usuario");
  return await playlistModel.updatePlaylist(userId, playlistId, name, imageUrl);
}

async function deletePlaylist(userId, playlistId) {
  const playlist = await playlistModel.getPlaylistById(userId, playlistId);
  if (!playlist) throw new Error('Playlist no encontrada o no pertenece al usuario');
  await playlistModel.deletePlaylist(playlistId);
}

// === Canciones ===
async function addSong(playlistId, songId) {
  return await playlistModel.addSongToPlaylist(playlistId, songId);
}

async function removeSong(playlistId, songId) {
  return await playlistModel.removeSongFromPlaylist(playlistId, songId);
}

async function getSongs(playlistId) {
  return await playlistModel.getSongsFromPlaylist(playlistId);
}

module.exports = {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSong,
  removeSong,
  getSongs,
};
