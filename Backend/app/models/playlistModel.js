const knex = require('../database/config/db');

// Playlists
const createPlaylist = (userId, name, imageUrl = null) =>
  knex("music_data.playlists")
    .insert({ user_id: userId, name, image_url: imageUrl })
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

// Canciones dentro de playlists
const addSongToPlaylist = (playlistId, songId) =>
  knex("music_data.playlist_songs").insert({ playlist_id: playlistId, song_id: songId });

const removeSongFromPlaylist = (playlistId, songId) =>
  knex("music_data.playlist_songs").where({ playlist_id: playlistId, song_id: songId }).del();

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
