const musicModel = require('../models/musicServices');


// Todo Testear
// Obtiene una lista con todos los artistas
exports.getAllArtists = async (_req, res) => {
  try {
    const all = await musicModel.getAllArtists();

    const allMusic = all.map(({ id, artist_name, genre_name }) => ({
      id,
      name: artist_name, 
      genre: genre_name
    }));

    res.json(allMusic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos solicitados.' });
  }
};



// ! sin testear 
// Obtiene una lista con todas las canciones o filtra por término de búsqueda
exports.getAllSongs = async (req, res) => {
  try {
    const { search } = req.query;
    let all;

    // Condicion de busqueda
    search
      ? (all = await musicModel.searchSongs(search))
      : (all = await musicModel.getAllSongs());

    // Filtro los datos obtenidos
    const allMusic = all.map(
      ({ id, artist, title, duration, genre, rating }) => {
        return { id, title, artist, duration, rating, genre };
      }
    );

    res.json(allMusic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos solicitados.' });
  }
};
