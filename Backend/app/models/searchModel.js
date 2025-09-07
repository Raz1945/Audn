const knex = require('../database/config/db');

const searchGlobal = async ({ searchTerm, type, limit = 50, offset = 0 }) => {
  const term = `%${searchTerm}%`;
  const results = {};

  // Filtrar por tipo
  if (!type || type === 'songs') {
    results.songs = await knex('music_data.songs as s')
      .join('music_data.artists as a', 's.artist_id', 'a.id')
      .join('music_data.albums as al', 's.album_id', 'al.id')
      .select(
        's.id',
        's.title',
        's.duration',
        'a.id as artist_id',
        'a.name as artist_name',
        'al.id as album_id',
        'al.title as album_title'
      )
      .where(function() {
        this.where('s.title', 'ilike', term)
          .orWhere('a.name', 'ilike', term)
          .orWhere('al.title', 'ilike', term);
      })
      .limit(limit)
      .offset(offset);
  }

  if (!type || type === 'artists') {
    results.artists = await knex('music_data.artists')
      .select('id', 'name', 'image_url')
      .where('name', 'ilike', term)
      .limit(limit)
      .offset(offset);
  }

  if (!type || type === 'albums') {
    results.albums = await knex('music_data.albums as al')
      .leftJoin('music_data.songs as s', 's.album_id', 'al.id')
      .select(
        'al.id',
        'al.title',
        'al.image_url',
        knex.raw('json_agg(json_build_object(\'id\', s.id, \'title\', s.title, \'duration\', s.duration)) as songs')
      )
      .where('al.title', 'ilike', term)
      .groupBy('al.id')
      .limit(limit)
      .offset(offset);
  }

  if (!type || type === 'playlists') {
    results.playlists = await knex('music_data.playlists as p')
      .leftJoin('music_data.playlist_songs as ps', 'ps.playlist_id', 'p.id')
      .leftJoin('music_data.songs as s', 's.id', 'ps.song_id')
      .leftJoin('music_data.artists as a', 's.artist_id', 'a.id')
      .select(
        'p.id',
        'p.name',
        'p.image_url',
        knex.raw('json_agg(json_build_object(\'id\', s.id, \'title\', s.title, \'artist_name\', a.name)) as songs')
      )
      .where('p.name', 'ilike', term)
      .groupBy('p.id')
      .limit(limit)
      .offset(offset);
  }

  return results;
};

module.exports = { searchGlobal };
