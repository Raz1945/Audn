exports.seed = async function (knex) {
  await knex('artists').withSchema('music_data').del();

  await knex('artists')
    .withSchema('music_data')
    .insert([
      // Artistas originales
      {
        id: 1,
        name: 'Taylor Swift',
        genre_id: 1,
        image_url: 'https://imgur.com/WS3RJkl.jpg',
      },
      {
        id: 2,
        name: 'The Beatles',
        genre_id: 2,
        image_url: 'https://imgur.com/v9r6rFZ.jpg',
      },
      {
        id: 3,
        name: 'Eminem',
        genre_id: 3,
        image_url: 'https://imgur.com/xzxHU8M.jpg',
      },
      {
        id: 4,
        name: 'Miles Davis',
        genre_id: 4,
        image_url: 'https://imgur.com/duTLPZX.jpg',
      },
      {
        id: 5,
        name: 'Beethoven',
        genre_id: 5,
        image_url: 'https://imgur.com/Rt4786h.jpg',
      },
      {
        id: 6,
        name: 'Bob Marley',
        genre_id: 6,
        image_url: 'https://imgur.com/d8l3Vjc.jpg',
      },
      {
        id: 7,
        name: 'Dolly Parton',
        genre_id: 7,
        image_url: 'https://imgur.com/f52oG1g.jpg',
      },
      {
        id: 8,
        name: 'Daft Punk',
        genre_id: 8,
        image_url: 'https://imgur.com/d8dhzNk.jpg',
      },
      {
        id: 9,
        name: 'Beyoncé',
        genre_id: 9,
        image_url: 'https://imgur.com/rMlqRpW.jpg',
      },
      {
        id: 10,
        name: 'Arctic Monkeys',
        genre_id: 10,
        image_url: 'https://imgur.com/zDa81gl.jpg',
      },

      // Nuevos artistas
      {
        id: 11,
        name: 'Queen',
        genre_id: 2,
        image_url: 'https://imgur.com/queen123.jpg',
      },
      {
        id: 12,
        name: 'Michael Jackson',
        genre_id: 1,
        image_url: 'https://imgur.com/mj456.jpg',
      },
      {
        id: 13,
        name: 'Led Zeppelin',
        genre_id: 2,
        image_url: 'https://imgur.com/ledzep789.jpg',
      },
      {
        id: 14,
        name: 'Drake',
        genre_id: 3,
        image_url: 'https://imgur.com/drake101.jpg',
      },
      {
        id: 15,
        name: 'Adele',
        genre_id: 1,
        image_url: 'https://imgur.com/adele202.jpg',
      },
      {
        id: 16,
        name: 'Kendrick Lamar',
        genre_id: 3,
        image_url: 'https://imgur.com/kendrick303.jpg',
      },
      {
        id: 17,
        name: 'Billie Eilish',
        genre_id: 10,
        image_url: 'https://imgur.com/billie404.jpg',
      },
      {
        id: 18,
        name: 'Metallica',
        genre_id: 11,
        image_url: 'https://imgur.com/metallica505.jpg',
      },
      {
        id: 19,
        name: 'Ed Sheeran',
        genre_id: 1,
        image_url: 'https://imgur.com/edsheeran606.jpg',
      },
      {
        id: 20,
        name: 'The Weeknd',
        genre_id: 9,
        image_url: 'https://imgur.com/weeknd707.jpg',
      },
      {
        id: 21,
        name: 'John Coltrane',
        genre_id: 4,
        image_url: 'https://imgur.com/coltrane808.jpg',
      },
      {
        id: 22,
        name: 'Johnny Cash',
        genre_id: 7,
        image_url: 'https://imgur.com/cash909.jpg',
      },
      {
        id: 23,
        name: 'Tame Impala',
        genre_id: 10,
        image_url: 'https://imgur.com/tame1010.jpg',
      },
      {
        id: 24,
        name: 'Bad Bunny',
        genre_id: 14,
        image_url: 'https://imgur.com/badbunny1111.jpg',
      },
      {
        id: 25,
        name: 'BTS',
        genre_id: 15,
        image_url: 'https://imgur.com/bts1212.jpg',
      },
      {
        id: 26,
        name: 'Lana Del Rey',
        genre_id: 1,
        image_url: 'https://imgur.com/lana1313.jpg',
      },
      {
        id: 27,
        name: 'Radiohead',
        genre_id: 10,
        image_url: 'https://imgur.com/radiohead1414.jpg',
      },
      {
        id: 28,
        name: 'Kanye West',
        genre_id: 3,
        image_url: 'https://imgur.com/kanye1515.jpg',
      },
      {
        id: 29,
        name: 'Foo Fighters',
        genre_id: 2,
        image_url: 'https://imgur.com/foo1616.jpg',
      },
      {
        id: 30,
        name: 'Shakira',
        genre_id: 14,
        image_url: 'https://imgur.com/shakira1717.jpg',
      },
      {
        id: 31,
        name: 'Coldplay',
        genre_id: 2,
        image_url: 'https://imgur.com/coldplay1818.jpg',
      },
      {
        id: 32,
        name: 'Bruno Mars',
        genre_id: 9,
        image_url: 'https://imgur.com/bruno1919.jpg',
      },
      {
        id: 33,
        name: 'Rihanna',
        genre_id: 1,
        image_url: 'https://imgur.com/rihanna2020.jpg',
      },
      {
        id: 34,
        name: 'The Rolling Stones',
        genre_id: 2,
        image_url: 'https://imgur.com/stones2121.jpg',
      },
      {
        id: 35,
        name: 'Lady Gaga',
        genre_id: 1,
        image_url: 'https://imgur.com/gaga2222.jpg',
      },
    ]);
};
