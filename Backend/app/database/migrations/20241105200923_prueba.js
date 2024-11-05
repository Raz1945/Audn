exports.up = function(knex) {
  return knex.schema
    // Tabla de géneros
    .createTable('genres', (table) => {
      table.bigIncrements('id').primary();
      table.string('name', 255).unique().notNullable();
    })
    
    // Tabla de usuarios
    .createTable('users', (table) => {
      table.bigIncrements('id').primary();
      table.string('username', 255).unique().notNullable();
      table.string('email', 255).unique().notNullable();
      table.text('password').notNullable();
      table.text('image_url');
      table.boolean('is_premium').defaultTo(false);
      table.timestamp('registration_date').defaultTo(knex.fn.now());
      table.timestamps(true, true);
    })

    // Tabla de artistas
    .createTable('artists', (table) => {
      table.bigIncrements('id').primary();
      table.string('name', 255).notNullable();
      table.bigInteger('genre_id').unsigned().references('id').inTable('genres').onDelete('CASCADE');
      table.text('image_url');
      table.timestamps(true, true);
    })

    // Tabla de álbumes
    .createTable('albums', (table) => {
      table.bigIncrements('id').primary();
      table.string('title', 255).notNullable();
      table.bigInteger('artist_id').unsigned().references('id').inTable('artists').onDelete('CASCADE');
      table.date('release_date');
      table.text('image_url');
      table.timestamps(true, true);
    })

    // Tabla de canciones
    .createTable('songs', (table) => {
      table.bigIncrements('id').primary();
      table.string('title', 255).notNullable();
      table.time('duration').notNullable(); // Ajustado a 'time' en lugar de 'interval'
      table.bigInteger('album_id').unsigned().references('id').inTable('albums').onDelete('CASCADE');
      table.bigInteger('artist_id').unsigned().references('id').inTable('artists').onDelete('CASCADE');
      table.integer('rating').checkBetween([0, 5]);
      table.bigInteger('genre_id').unsigned().references('id').inTable('genres').onDelete('CASCADE');
      table.text('image_url');
      table.timestamps(true, true);
    })

    // Tabla de listas de reproducción
    .createTable('playlists', (table) => {
      table.bigIncrements('id').primary();
      table.string('name', 255).notNullable();
      table.bigInteger('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.text('image_url');
      table.timestamps(true, true);
    })

    // Tabla intermedia de canciones en listas de reproducción
    .createTable('playlist_songs', (table) => {
      table.bigInteger('playlist_id').unsigned().references('id').inTable('playlists').onDelete('CASCADE');
      table.bigInteger('song_id').unsigned().references('id').inTable('songs').onDelete('CASCADE');
      table.primary(['playlist_id', 'song_id']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('playlist_songs')
    .dropTableIfExists('playlists')
    .dropTableIfExists('songs')
    .dropTableIfExists('albums')
    .dropTableIfExists('artists')
    .dropTableIfExists('users')
    .dropTableIfExists('genres');
};
