const knex = require('../database/config/db');

//=== Artists ===//
const getAllArtists = async () => {
  try {
    return await knex('music_data.artists')
      .select(
        'music_data.artists.id AS artist_id',
        'music_data.artists.name AS artist_name',
        'music_data.genres.name AS genre_name',
        'music_data.artists.image_url AS artist_image'
      )
      .leftJoin('music_data.genres', 'music_data.artists.genre_id', 'music_data.genres.id')
      .orderBy('artist_name', 'asc');
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
};



//! De aca para abajo no esta testeado. 
//=== Info ===//
// Muestro las playlist y su contenido segun de un usuario especifico.
const getUserPlaylistData = async (id) => {
  const result = await knex
    .select({
      user: 'us.user',
      playlist: 'pl.name',
    })
    .column(
      'pl.id as playlist_id',
      'ps.song_id',
      'so.title',
      'so.duration',
      'so.artist',
      'so.rating'
    )
    .from('playlists as pl')
    .leftJoin('playlist_song as ps', 'pl.id', 'ps.playlist_id')
    .leftJoin('songs as so', 'ps.song_id', 'so.id')
    .join('users as us', 'pl.user_id', 'us.id')
    .where('us.id', id)
    .orderBy('pl.name');

  return result;
};




//=== Songs ===//
// Muesto todas las canciones de la base de datos.

// Obtiene todas las canciones con nombres de artista, álbum y género
const getAllSongs = async () => {
  try {
    return await knex('music_data.songs')
      .join('music_data.artists', 'music_data.songs.artist_id', 'music_data.artists.id')
      .join('music_data.albums', 'music_data.songs.album_id', 'music_data.albums.id')
      .join('music_data.genres', 'music_data.songs.genre_id', 'music_data.genres.id')
      .select(
        'music_data.songs.title',
        'music_data.artists.name as artist', 
        'music_data.artists.image_url as image_artist', 
        'music_data.albums.title as album',
        'music_data.albums.image_url as image_album',
        'music_data.songs.duration',
        'music_data.songs.rating',
        'music_data.genres.name as genre' 
      );
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};

// Busca canciones por término con nombres de artista, álbum y género
const searchSongs = async (searchTerm) => {
  try {
    return await knex('music_data.songs')
      .join('music_data.artists', 'music_data.songs.artist_id', 'music_data.artists.id')
      .join('music_data.albums', 'music_data.songs.album_id', 'music_data.albums.id')
      .join('music_data.genres', 'music_data.songs.genre_id', 'music_data.genres.id')
      .select(
        'music_data.songs.title',
        'music_data.artists.name as artist_name',
        'music_data.artists.image_url as image_artist', 
        'music_data.albums.title as album_title',
        'music_data.albums.image_url as image_album',
        'music_data.songs.duration',
        'music_data.songs.rating',
        'music_data.genres.name as genre_name'
      )
      .where('music_data.songs.title', 'like', `%${searchTerm}%`);
  } catch (error) {
    console.error('Error searching songs:', error);
    throw error;
  }
};


// Agrega una canción a la Playlist.
const addSongToPlaylist = async (song_id, playlist_id) => {
  await knex('playlist_song').insert({
    song_id: song_id,
    playlist_id: playlist_id,
  });
};
// Elimina una cancion de la playlists.
const removeSongFromPlaylist = (song_id, playlist_id) => {
  return knex('playlist_song')
    .where('song_id', song_id)
    .where('playlist_id', playlist_id)
    .del();
};



//=== Playlists ===//
// Agrega una playlist a un usuario especifico.
const addPlaylist = (id, playlist_name) => {
  return knex('playlists')
    .insert({
      user_id: id,
      name: playlist_name,
    })
    .returning('id'); // Especificamos que queremos obtener el ID generado
};
// Elimina una playlist.
const removePlaylist = async (id, playlist_id) => {
  await knex('playlist_song').where('playlist_id', playlist_id).del();
  await knex('playlists').where('user_id', id).where('id', playlist_id).del();
};



//=== Verificaciones ===//
// Verifica que exista la playlist y que pertenezca al usuario.
const doesPlaylistExist = async (playlist_id, id) => {
  const playlist = await knex
    .select('*')
    .from('playlists as pl')
    .join('users as us', 'pl.user_id', 'us.id')
    .where('pl.id', playlist_id)
    .where('us.id', id)
    .first();
  return !!playlist;
};
// Verificar si un song_id ingresado existe en la tabla songs.
const doesSongExist = async (song_id) => {
  const song = await knex('songs').where('id', song_id).first();
  return song !== undefined;
};
// Verifica si una canción ya existe en dicha playlist.
const isSongAddedInPlaylist = async (song_id, playlist_id) => {
  const musicExists = await knex('playlist_song')
    .select('*')
    .where('song_id', song_id)
    .where('playlist_id', playlist_id);

  return musicExists.length > 0 ? true : false;
};

module.exports = {
  getAllArtists,
  getUserPlaylistData,
  getAllSongs,
  searchSongs,
  doesPlaylistExist,
  doesSongExist,
  isSongAddedInPlaylist,
  addSongToPlaylist,
  addPlaylist,
  removePlaylist,
  removeSongFromPlaylist,
};
