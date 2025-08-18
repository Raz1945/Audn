const musicModel = require('../models/musicServices');


// Obtiene una lista con todos los artistas
const getAllArtists = async (_req, res) => {
  try {
    const all = await musicModel.getAllArtists();

    const allMusic = all.map(({ id, artist_name, genre_name, artist_image }) => ({
      id,
      name: artist_name, 
      genre: genre_name,
      image: artist_image
    }));

    res.json(allMusic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos solicitados.' });
  }
};


// Obtiene una lista con todas las canciones o filtra por término de búsqueda
//? no se si esta disenada para filtrar 
const getAllSongs = async (req, res) => {
  try {
    const { search } = req.query;
    let allSongs;

    // Determinar si usar búsqueda o consulta general
    if (search) {
      allSongs = await musicModel.searchSongs(search);
    } else {
      allSongs = await musicModel.getAllSongs();
    }

    res.json(allSongs);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Error al obtener los datos solicitados.' });
  }
};

module.exports = { getAllArtists, getAllSongs};
