const knex = require('../database/config/db');

// === Playlists ===
const createPlaylist = (userId, name, imageUrl = null) =>
  knex("music_data.playlists")
    .insert({ user_id: userId, name, image_url: imageUrl, songs_count: 0 })
    .returning("*");

const getPlaylistById = (userId, playlistId) =>
  knex("music_data.playlists")
    .where({ id: playlistId, user_id: userId })
    .first();

const getUserPlaylists = (userId) =>
  knex("music_data.playlists")
    .where({ user_id: userId })
    .select("*");

const updatePlaylist = (userId, playlistId, name, imageUrl) =>
  knex("music_data.playlists")
    .where({ id: playlistId, user_id: userId })
    .update(
      {
        ...(name && { name }),
        ...(imageUrl && { image_url: imageUrl })
      },
      ["id", "user_id", "name", "image_url"]
    );

const deletePlaylist = (playlistId) =>
  knex("music_data.playlists").where({ id: playlistId }).del();

// === Canciones en playlist ===
const addSongToPlaylist = async (playlistId, songId) => {
  const playlist = await knex("music_data.playlists").where({ id: playlistId }).first();
  if (!playlist) throw new Error('La playlist no existe.');

  const exists = await knex("music_data.playlist_songs")
    .where({ playlist_id: playlistId, song_id: songId })
    .first();
  if (exists) throw new Error('La canción ya está en la playlist.');

  await knex("music_data.playlist_songs").insert({ playlist_id: playlistId, song_id: songId });
  await knex("music_data.playlists").where({ id: playlistId }).increment('songs_count', 1);

  return { success: true, message: 'Canción añadida correctamente.' };
};

const removeSongFromPlaylist = async (playlistId, songId) => {
  const playlist = await knex("music_data.playlists").where({ id: playlistId }).first();
  if (!playlist) throw new Error('La playlist no existe.');

  const exists = await knex("music_data.playlist_songs")
    .where({ playlist_id: playlistId, song_id: songId })
    .first();
  if (!exists) throw new Error('La canción no está en la playlist.');

  await knex("music_data.playlist_songs").where({ playlist_id: playlistId, song_id: songId }).del();
  await knex("music_data.playlists").where({ id: playlistId }).decrement('songs_count', 1);

  return { success: true, message: 'Canción removida correctamente.' };
};

const getSongsFromPlaylist = (playlistId) =>
  knex("music_data.songs as s")
    .join("music_data.playlist_songs as ps", "s.id", "ps.song_id")
    .where("ps.playlist_id", playlistId)
    .select("s.*");

module.exports = {
  createPlaylist,
  getPlaylistById,
  getUserPlaylists,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  getSongsFromPlaylist,
};
