const playlist_songsSchema = (knex) => (table) => {
  table.bigInteger('playlist_id').unsigned().references('id').inTable('playlists').onDelete('CASCADE');
  table.bigInteger('song_id').unsigned().references('id').inTable('songs').onDelete('CASCADE');
  table.primary(['playlist_id', 'song_id']);
};

module.exports = playlist_songsSchema;
