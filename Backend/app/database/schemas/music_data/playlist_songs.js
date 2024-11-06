const createPlaylistSongsTable = (table) => {
  table
    .bigInteger('playlist_id')
    .unsigned()
    .references('id')
    .inTable('music_data.playlists')
    .onDelete('CASCADE');
  table
    .bigInteger('song_id')
    .unsigned()
    .references('id')
    .inTable('music_data.songs')
    .onDelete('CASCADE');
  table.primary(['playlist_id', 'song_id']);
};

module.exports = createPlaylistSongsTable;
