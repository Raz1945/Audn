-- Insertar datos de ejemplo en géneros
INSERT INTO music_data.genres (name) VALUES
  ('Pop'),
  ('Rock'),
  ('Hip Hop'),
  ('Jazz'),
  ('Classical'),
  ('Reggae'),
  ('Country'),
  ('Electronic'),
  ('R&B'),
  ('Indie');


-- Insertar datos de ejemplo en usuarios
INSERT INTO user_data.users (username, email, password, image_url, is_premium) VALUES
  ('johndoe', 'johndoe@example.com', 'password123', 'https://example.com/images/johndoe.jpg', false),
  ('janedoe', 'janedoe@example.com', 'password123', 'https://example.com/images/janedoe.jpg', true),
  ('michael', 'michael@example.com', 'password123', 'https://example.com/images/michael.jpg', false),
  ('sarah', 'sarah@example.com', 'password123', 'https://example.com/images/sarah.jpg', true),
  ('david', 'david@example.com', 'password123', 'https://example.com/images/david.jpg', false),
  ('emma', 'emma@example.com', 'password123', 'https://example.com/images/emma.jpg', false),
  ('oliver', 'oliver@example.com', 'password123', 'https://example.com/images/oliver.jpg', true),
  ('lucas', 'lucas@example.com', 'password123', 'https://example.com/images/lucas.jpg', false),
  ('mia', 'mia@example.com', 'password123', 'https://example.com/images/mia.jpg', false),
  ('ava', 'ava@example.com', 'password123', 'https://example.com/images/ava.jpg', true);


-- Insertar datos de ejemplo en artistas
INSERT INTO music_data.artists (name, genre_id, image_url) VALUES
  ('Taylor Swift', 1, 'https://example.com/images/taylor_swift.jpg'),
  ('The Beatles', 2, 'https://example.com/images/beatles.jpg'),
  ('Eminem', 3, 'https://example.com/images/eminem.jpg'),
  ('Miles Davis', 4, 'https://example.com/images/miles_davis.jpg'),
  ('Beethoven', 5, 'https://example.com/images/beethoven.jpg'),
  ('Bob Marley', 6, 'https://example.com/images/bob_marley.jpg'),
  ('Dolly Parton', 7, 'https://example.com/images/dolly_parton.jpg'),
  ('Daft Punk', 8, 'https://example.com/images/daft_punk.jpg'),
  ('Beyoncé', 9, 'https://example.com/images/beyonce.jpg'),
  ('Arctic Monkeys', 10, 'https://example.com/images/arctic_monkeys.jpg');


-- Insertar datos de ejemplo en álbumes
INSERT INTO music_data.albums (title, artist_id, release_date, image_url) VALUES
  ('1989', 1, '2014-10-27', 'https://example.com/images/1989.jpg'),
  ('Abbey Road', 2, '1969-09-26', 'https://example.com/images/abbey_road.jpg'),
  ('The Marshall Mathers LP', 3, '2000-05-23', 'https://example.com/images/marshall_mathers_lp.jpg'),
  ('Kind of Blue', 4, '1959-08-17', 'https://example.com/images/kind_of_blue.jpg'),
  ('Symphony No. 5', 5, '1808-12-22', 'https://example.com/images/symphony_no_5.jpg'),
  ('Legend', 6, '1984-05-08', 'https://example.com/images/legend.jpg'),
  ('Here You Come Again', 7, '1977-10-01', 'https://example.com/images/here_you_come_again.jpg'),
  ('Random Access Memories', 8, '2013-05-17', 'https://example.com/images/random_access_memories.jpg'),
  ('Lemonade', 9, '2016-04-23', 'https://example.com/images/lemonade.jpg'),
  ('AM', 10, '2013-09-09', 'https://example.com/images/am.jpg');


-- Insertar datos de ejemplo en canciones
INSERT INTO music_data.songs (title, duration, album_id, artist_id, rating, genre_id, image_url) VALUES
  ('Shake It Off', '00:03:39', 1, 1, 5, 1, 'https://example.com/images/shake_it_off.jpg'),
  ('Come Together', '00:04:19', 2, 2, 5, 2, 'https://example.com/images/come_together.jpg'),
  ('Stan', '00:04:56', 3, 3, 5, 3, 'https://example.com/images/stan.jpg'),
  ('So What', '00:03:35', 3, 3, 4, 3, 'https://example.com/images/so_what.jpg'),
  ('Freddie Freeloader', '00:09:53', 4, 4, 5, 4, 'https://example.com/images/freddie_freeloader.jpg'),
  ('Für Elise', '00:02:55', 5, 5, 5, 5, 'https://example.com/images/fur_elise.jpg'),
  ('No Woman, No Cry', '00:07:06', 6, 6, 5, 6, 'https://example.com/images/no_woman_no_cry.jpg'),
  ('Jolene', '00:02:41', 7, 7, 4, 7, 'https://example.com/images/jolene.jpg'),
  ('Get Lucky', '00:06:09', 8, 8, 5, 8, 'https://example.com/images/get_lucky.jpg'),
  ('Formation', '00:03:26', 9, 9, 5, 9, 'https://example.com/images/formation.jpg'),
  ('Do I Wanna Know?', '00:04:01', 10, 10, 5, 10, 'https://example.com/images/do_i_wanna_know.jpg');


-- Insertar datos de ejemplo en listas de reproducción
INSERT INTO music_data.playlists (name, user_id, image_url) VALUES
  ('John’s Favorites', 1, 'https://example.com/images/johns_favorites.jpg'),
  ('Jane’s Road Trip', 2, 'https://example.com/images/janes_road_trip.jpg'),
  ('Michael’s Workout', 3, 'https://example.com/images/michaels_workout.jpg'),
  ('Sarah’s Chill Vibes', 4, 'https://example.com/images/sarahs_chill_vibes.jpg'),
  ('David’s Party Mix', 5, 'https://example.com/images/davids_party_mix.jpg'),
  ('Emma’s Classics', 6, 'https://example.com/images/emmas_classics.jpg'),
  ('Oliver’s Favorites', 7, 'https://example.com/images/olivers_favorites.jpg'),
  ('Lucas’s Indie Picks', 8, 'https://example.com/images/lucas_indie_picks.jpg'),
  ('Mia’s Dance Hits', 9, 'https://example.com/images/mias_dance_hits.jpg'),
  ('Ava’s Relaxation', 10, 'https://example.com/images/avas_relaxation.jpg');


-- Insertar datos de ejemplo en la tabla de canciones de listas de reproducción
INSERT INTO music_data.playlist_songs (playlist_id, song_id) VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4),
  (3, 5),
  (4, 6),
  (4, 7),
  (5, 8),
  (6, 9),
  (7, 10);
