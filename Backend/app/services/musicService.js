const musicModel = require('../models/musicModel');

async function getAllMusic() {
  return await musicModel.getAllMusic();
}


// Si el artista no tiene imagen, le asignamos una por defecto
async function getRandomArtists() {
  const playlistAritstImage = "https://i.imgur.com/aEKiDlB.jpeg";

  // Llamamos al model, máximo 25 artistas
  const artists = await musicModel.getRandomArtists(25);
  if (!artists || artists.length === 0) throw new Error("No se encontraron artistas");

  // Agregamos la imagen por defecto si falta
  const sanitizedArtists = artists.map((artist) => ({
    ...artist,
    img: artist.img && artist.img.trim() !== "" ? artist.img : playlistAritstImage,
  }));

  return sanitizedArtists;
}



async function getArtistSongs(artistId) {
  return await musicModel.getArtistSongs(artistId);
}

module.exports = {
  getAllMusic,
  getRandomArtists,
  getArtistSongs,
};
