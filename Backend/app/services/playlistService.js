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


// === Cupido Musical ===
async function createCupidoPlaylist(userId, artists) {
    // Buscar imagen de portada: primero artista con imagen o predeterminada
  const playlistImage = "https://i.imgur.com/buVdhRQ.jpeg";


  // Crear la playlist vacía primero
  const [playlist] = await playlistModel.createPlaylist(
    userId,
    "Playlist Cupido Musical ❤️",
    playlistImage
  );

  if (!playlist) throw new Error("No se pudo crear la playlist");

  // Buscar canciones de esos artistas
  const songs = await playlistModel.getSongsByArtists(artists);

  // Opcional: limitar a 2-3 canciones por artista
  const balanced = balanceSongsByArtist(songs, 3);

  // Insertar canciones en la playlist
  for (const song of balanced) {
    await playlistModel.addSongToPlaylist(playlist.id, song.id);
  }

  return { ...playlist, songs: balanced };
}

// auxiliar para que no se te llene de 50 temas de un solo artista
function balanceSongsByArtist(songs, limitPerArtist) {
  const grouped = {};
  songs.forEach(song => {
    if (!grouped[song.artist_id]) grouped[song.artist_id] = [];
    if (grouped[song.artist_id].length < limitPerArtist) {
      grouped[song.artist_id].push(song);
    }
  });
  return Object.values(grouped).flat();
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
  createCupidoPlaylist,
};
