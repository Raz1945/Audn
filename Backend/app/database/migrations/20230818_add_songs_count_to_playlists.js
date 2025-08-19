exports.up = function (knex) {
  return knex.schema.withSchema('music_data').table('playlists', function (table) {
    table.integer('songs_count').defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.withSchema('music_data').table('playlists', function (table) {
    table.dropColumn('songs_count');
  });
};
