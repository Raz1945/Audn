const musicModel = require('../models/musicServices');

// Función para convertir "HH:MM:SS" a segundos
const convertHMSToSeconds = (duration) => {
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

// Función para convertir la duración a "HH:MM:SS"
const formatDurationAsString = (duration) => {
  const hours = duration.hours.toString().padStart(2, '0');
  const minutes = duration.minutes.toString().padStart(2, '0');
  const seconds = duration.seconds.toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

// Función para convertir segundos a un objeto con horas, minutos y segundos
const convertSecondsToHMS = (seconds) => {
  if (isNaN(seconds) || seconds < 0) {
    // Depura valores inválidos
    console.log('Invalid duration:', seconds); 
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return {
    hours: hours,
    minutes: minutes,
    seconds: remainingSeconds
  };
};


// Función para obtener la playlist del usuario
exports.getUserPlaylist = async (req, res) => {
  try {
    const { id } = req.body; // Leer el id desde el body
    const data = await musicModel.getUserPlaylistData(id);

    // Verifica los valores de la respuesta
    // console.log('Data from database:', data); // TODO ELIMINAR LUEGO 

    // Si no se encuentran playlists, devolver una respuesta vacía
    if (data.length < 1) {
      return res.json({ playlists: [] });
    }

    // Usamos un objeto para acumular las playlists por usuario
    const userPlaylists = data.reduce((acc, row) => {
      const {
        song_id,
        playlist_id,
        user_id,
        playlist_name,
        playlist_img,
        song_title,
        song_duration,
        song_img,
        artist_name,
        artis_img,
        song_rating,
      } = row;

      console.log('duracion:', song_duration);

      // Convertir la duración a segundos
      const durationInSeconds = convertHMSToSeconds(song_duration);

      // Asegurarse de que la playlist existe en el acumulador, sino crearla
      if (!acc[user_id]) {
        acc[user_id] = { playlists: {} };
      }

      // Si la playlist no está, agregarla
      if (!acc[user_id].playlists[playlist_id]) {
        acc[user_id].playlists[playlist_id] = {
          id: playlist_id,
          name: playlist_name,
          img: playlist_img, // Imagen de la playlist
          songs: [],
        };
      }

      // Agregar la canción a la lista de reproducción
      acc[user_id].playlists[playlist_id].songs.push({
        id: song_id,
        title: song_title,
        duration: formatDurationAsString(convertSecondsToHMS(durationInSeconds)), // Asegúrate de pasar una duración válida
        img: song_img, 
        artist_name: artist_name,
        artist_img: artis_img, 
        rating: song_rating,
      });

      return acc;
    }, {});

    const playlists = userPlaylists[id] ? userPlaylists[id].playlists : [];
    res.json({ playlists: Object.values(playlists) });
  } catch (error) {
    console.error('Error al obtener las playlists del usuario:', error);
    res.status(500).json({ error: 'Error al obtener los datos solicitados.' });
  }
};


// TODO 
// Agrega una cancion a una playlist.
exports.addSongToUserPlaylist = async (req, res) => {
  try {
    const id = req.user.id;

    const { song_id, playlist_id } = req.body;

    // Verificar si el playlist_id existe en la tabla playlists y que corresponda al usuario indicado
    const playlistExists = await musicModel.doesPlaylistExist(playlist_id, id);
    if (!playlistExists) {
      return res.status(404).json({
        error: 'El playlist_id proporcionado no existe en la tabla playlists.',
      });
    }

    // Verificar si el song_id existe en la tabla songs
    const songExists = await musicModel.doesSongExist(song_id);
    if (!songExists) {
      return res.status(404).json({
        error: 'El song_id proporcionado no existe en la tabla songs.',
      });
    }

    //  Verifica si existe ya en la playlists
    const songExistsInPlaylist = await musicModel.isSongAddedInPlaylist(
      song_id,
      playlist_id
    );
    if (songExistsInPlaylist.length > 0) {
      return res.status(400).json({
        error: 'La canción ya existe en la playlist.',
      });
    }

    // Realizar la inserción en la tabla playlist_song
    await musicModel.addSongToPlaylist(song_id, playlist_id);

    return res.json({ message: 'El registro añadido con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al añadir.' });
  }
};

// Elimina una cancion de una playlist.
exports.removeSongToUserPlaylist = async (req, res) => {
  try {
    const id = req.user.id;
    const { song_id, playlist_id } = req.body;

    // Verificar si el playlist_id existe en la tabla playlists y que corresponda al usuario indicado
    const playlistExists = await musicModel.doesPlaylistExist(playlist_id, id);
    if (!playlistExists) {
      return res.status(404).json({
        error: 'El playlist_id proporcionado no existe en la tabla playlists.',
      });
    }

    // Verificar si el song_id existe en la tabla songs
    const songExists = await musicModel.doesSongExist(song_id);
    if (!songExists) {
      return res.status(404).json({
        error: 'El song_id proporcionado no existe en la tabla songs.',
      });
    }

    //  Verifica si existe la cancion en la playlists
    const songExistsInPlaylist = await musicModel.isSongAddedInPlaylist(
      song_id,
      playlist_id
    );
    if (!songExistsInPlaylist) {
      return res.status(400).json({
        error: 'La canción no existe en la playlist indicada.',
      });
    }

    // Elimina la cancion indicada
    await musicModel.removeSongFromPlaylist(song_id, playlist_id);

    return res.json({ message: 'El registro eliminado con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar.' });
  }
};

//* Agrega una playlist.
exports.addPlaylistToUser = async (req, res) => {
  try {
    const id = req.user.id;
    const { playlist_name } = req.body;

    // Realizar la creacion de una playlist
    await musicModel.addPlaylist(id, playlist_name);

    return res.json({ message: 'El registro ha sido añadido con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al añadir.' });
  }
};

exports.addPlaylistWithSongsToUser = async (req, res) => {
  try {
    const id = req.user.id;
    const { playlist_name, songs } = req.body;

    // Realizar la creacion de una playlist
    const newPlaylistId = await musicModel.addPlaylist(id, playlist_name);

    console.log(newPlaylistId[0].id);

    const uniqueSongs = [...new Set(songs)];

    // Verifico que cada cancion exita
    for (let index = 0; index < uniqueSongs.length; index++) {
      const song_id = uniqueSongs[index];

      try {
        // Verificar si el song_id existe en la tabla songs
        const songExists = await musicModel.doesSongExist(song_id);

        if (songExists) {
          // Realizar la inserción en la tabla playlist_song
          await musicModel.addSongToPlaylist(song_id, newPlaylistId[0].id);
        }
      } catch (error) {
        console.log('\x1b[31m\x1b[0m', 'Error:', error);
      }
    }

    return res.json({ message: 'El registro ha sido añadido con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al añadir.' });
  }
};

// Elimina una playlist.
exports.removePlaylistToUser = async (req, res) => {
  try {
    const id = req.user.id;
    const { playlist_id } = req.body;

    // Verificar si el playlist_id existe en la tabla playlists y que corresponda al usuario indicado
    const playlistExists = await musicModel.doesPlaylistExist(playlist_id, id);
    if (!playlistExists) {
      return res.status(404).json({
        error: 'El playlist_id proporcionado no existe en la tabla playlists.',
      });
    }

    // Elimina la playlists indicada
    await musicModel.removePlaylist(id, playlist_id);

    return res.json({ message: 'El registro eliminado con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar.' });
  }
};
