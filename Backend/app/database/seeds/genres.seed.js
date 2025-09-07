exports.seed = async function (knex) {
  await knex('genres').withSchema('music_data').del();

  await knex('genres').withSchema('music_data').insert([
    { id: 1, name: 'Pop' },
    { id: 2, name: 'Rock' },
    { id: 3, name: 'Hip Hop' },
    { id: 4, name: 'Jazz' },
    { id: 5, name: 'Classical' },
    { id: 6, name: 'Reggae' },
    { id: 7, name: 'Country' },
    { id: 8, name: 'Electronic' },
    { id: 9, name: 'R&B' },
    { id: 10, name: 'Indie' },
    { id: 11, name: 'Metal' },
    { id: 12, name: 'Folk' },
    { id: 13, name: 'Blues' },
    { id: 14, name: 'Latin' },
    { id: 15, name: 'K-Pop' }
  ]);
};
