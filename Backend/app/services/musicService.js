const musicModel = require('../models/musicModel');

async function getAllMusic() {
  return await musicModel.getAllMusic();
}

async function getRandomArtists() {
  // Llamamos al model, máximo 15 artistas
  const artists = await musicModel.getRandomArtists(15);
  if (!artists || artists.length === 0) throw new Error("No se encontraron artistas");
  return artists;
}

async function getArtistSongs(artistId) {
  return await musicModel.getArtistSongs(artistId);
}

module.exports = {
  getAllMusic,
  getRandomArtists,
  getArtistSongs,
};
