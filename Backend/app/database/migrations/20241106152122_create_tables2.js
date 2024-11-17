// migrations/create_tables.js
const usersSchema = require('../schemas/user_data/users');
const genresSchema = require('../schemas/music_data/genres');
const artistsSchema = require('../schemas/music_data/artists');
const albumsSchema = require('../schemas/music_data/albums');
const songsSchema = require('../schemas/music_data/songs');
const playlistsSchema = require('../schemas/music_data/playlists');
const playlistSongsSchema = require('../schemas/music_data/playlist_songs');

exports.up = async function(knex) {
  // Crear los esquemas 'user_data' y 'music_data' si no existen
  await knex.schema.createSchemaIfNotExists('user_data');
  await knex.schema.createSchemaIfNotExists('music_data');
  
  // Crear las tablas dentro de cada esquema
  await knex.schema
    .withSchema('user_data')
    .createTable('users', usersSchema);  // Crear la tabla de usuarios
  
  await knex.schema
    .withSchema('music_data')
    .createTable('genres', genresSchema)  // Crear la tabla de géneros
    .createTable('artists', artistsSchema)  // Crear la tabla de artistas
    .createTable('albums', albumsSchema)  // Crear la tabla de álbumes
    .createTable('songs', songsSchema)  // Crear la tabla de canciones
    .createTable('playlists', playlistsSchema)  // Crear la tabla de listas de reproducción
    .createTable('playlist_songs', playlistSongsSchema);  // Crear la tabla intermedia de canciones en listas de reproducción
};

exports.down = async function(knex) {
  // Eliminar las tablas en orden inverso para evitar problemas con las claves foráneas
  await knex.schema
    .withSchema('music_data')
    .dropTableIfExists('playlist_songs')
    .dropTableIfExists('playlists')
    .dropTableIfExists('songs')
    .dropTableIfExists('albums')
    .dropTableIfExists('artists')
    .dropTableIfExists('genres');
  
  await knex.schema
    .withSchema('user_data')
    .dropTableIfExists('users');
};
