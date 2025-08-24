const knex = require('../database/config/db');

const getAllMusic = () => {
  return knex("music_data.artists").select("*");
};

// Saca hasta 'limit' artistas random con una canción y álbum asociado
const getRandomArtists = async (limit = 15) => {
  return await knex("music_data.artists as a")
    .join("music_data.genres as g", "a.genre_id", "g.id")
    .leftJoin("music_data.songs as s", "a.id", "s.artist_id")
    .leftJoin("music_data.albums as al", "s.album_id", "al.id")
    .select(
      "a.id as id",
      "a.name as name",
      "a.image_url as image",
      "g.name as genre",
      "s.title as song_title",
      "s.image_url as song_image",
      "al.title as album_title",
      "al.image_url as album_image"
    )
    .groupBy("a.id", "g.id", "s.id", "al.id")
    .orderByRaw("RANDOM()") // Postgres soporta RANDOM()
    .limit(limit);
};

// Canciones de un artista, ordenadas por rating desc + random
const getArtistSongs = (artistId) => {
  return knex("music_data.songs as s")
    .join("music_data.albums as al", "s.album_id", "al.id")
    .where("s.artist_id", artistId)
    .select(
      "s.id",
      "s.title",
      "s.rating",
      "s.image_url",
      "al.title as album_title",
      "al.image_url as album_image"
    )
    .orderBy([
      { column: "s.rating", order: "desc" },
      { column: knex.raw("RANDOM()") }
    ]);
};


module.exports = {
  getAllMusic,
  getRandomArtists,
  getArtistSongs,
};
