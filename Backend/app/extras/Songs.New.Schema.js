const knex = require('knex');  

//! Este es el esquema para la tabla de canciones,
//! incluyendo campos adicionales para mejorar la metadata y funcionalidad.

const createSongsTable = (table) => {
    table.bigIncrements('id').primary();
    table.string('title', 255).notNullable();             // Nombre de la canción
    table.string('subtitle', 255);                        // Subtítulo o versión (ej: "Acoustic", "Remastered")
    table.time('duration').notNullable();                 // Duración
    table.integer('track_number');                        // Número de track dentro del álbum
    table.integer('disc_number').defaultTo(1);            // Para álbumes con varios discos

    // Relaciones
    table
      .bigInteger('album_id')
      .unsigned()
      .references('id')
      .inTable('music_data.albums')
      .onDelete('CASCADE');
    table
      .bigInteger('artist_id')
      .unsigned()
      .references('id')
      .inTable('music_data.artists')
      .onDelete('CASCADE');
    table
      .bigInteger('genre_id')
      .unsigned()
      .references('id')
      .inTable('music_data.genres')
      .onDelete('CASCADE');

    // Extra metadata
    table.integer('rating').checkBetween([0, 5]);         // Puntuación
    table.integer('play_count').defaultTo(0);             // Veces reproducida
    table.integer('likes').defaultTo(0);                  // Cantidad de likes
    table.integer('popularity').defaultTo(0);             // Métrica calculada (ej: mezcla entre likes/plays)
    table.date('release_date');                           // Fecha de lanzamiento
    table.boolean('explicit').defaultTo(false);           // Contenido explícito
    table.text('lyrics');                                 // Letra de la canción
    table.string('language', 50).defaultTo('es');         // Idioma

    // Archivos y multimedia
    table.text('audio_url');                              // Link al archivo de audio
    table.text('image_url');                              // Imagen de portada

    table.timestamps(true, true);                         // created_at / updated_at
};

module.exports = createSongsTable;
