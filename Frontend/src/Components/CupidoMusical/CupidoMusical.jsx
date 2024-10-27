import { useEffect, useState } from 'react';
import { AppContainer } from '../other/AppContainer/AppContainer';
import { CupidoMusicalHeader } from './CupidoMusical.header/CupidoMusical.header';
import artistsData from '../../data/songs.json';
import { Loader } from '../Loaders/Loader/Loader';
import { CupidoMusicalCard } from './CupidoMusical.card/CupidoMusical.card';
import { CupidoMusicalButton } from './CupidoMusicalButton/CupidoMusicalButton';
import { smIcons } from '../../assets/icons';
import { ButtonStandard } from '../ButtonStandard/ButtonStandard';
import './index.css';

export const CupidoMusical = () => {
  const [likeList, setLikeList] = useState([]);
  const [artists, setArtists] = useState([]);
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [nextArtistIndex, setNextArtistIndex] = useState(1);
  const [availableArtists, setAvailableArtists] = useState([]);

  useEffect(() => {
    setArtists(artistsData);
  }, []);

  useEffect(() => {
    const filteredArtists = artists.filter(
      (artist) => !likeList.includes(artist)
    );
    setAvailableArtists(filteredArtists);
  }, [artists, likeList]);

  const handleLikeArtist = () => {
    if (likeList.length >= 6) {
      alert('¡Has alcanzado el límite de 6 likes!');
      return;
    }

    const currentArtist = availableArtists[currentArtistIndex];
    setLikeList((prevLikes) => [...prevLikes, currentArtist]);
    setCurrentArtistIndex(nextArtistIndex);
    setNextArtistIndex((nextArtistIndex + 1) % availableArtists.length);
  };

  const handleDislikeArtist = () => {
    setCurrentArtistIndex(nextArtistIndex);
    setNextArtistIndex((nextArtistIndex + 1) % availableArtists.length);
  };

  const handleRewindArtist = () => {
    if (likeList.length === 0) {
      console.log('No hay artistas en la lista de likes para remover.');
      return;
    }

    // Obtener el último artista de la lista de "likes"
    const lastLikedArtist = likeList[likeList.length - 1];
    setLikeList((prevLikes) => prevLikes.slice(0, -1)); // Eliminar el último artista de la lista de "likes"

    // Si el artista eliminado era el actual, ajustar los índices
    if (availableArtists[currentArtistIndex] === lastLikedArtist) {
      setCurrentArtistIndex(nextArtistIndex);
      setNextArtistIndex((nextArtistIndex + 1) % availableArtists.length);
    }
  };

  // Todo Falta agregar la funcion para crear una playlist recomendada, basandose en los 'likes' 
  const handleCreatePlaylist = () => {
    alert('Se crea la playlist');
    console.log('Se crea la playlist');
  };

  return (
    <AppContainer>
      {availableArtists.length === 0 ? (
        <Loader />
      ) : (
        <>
          <CupidoMusicalHeader />

          <div className='cupido-container'>
            <CupidoMusicalCard
              src={availableArtists[currentArtistIndex]?.imageURL}
              alt={availableArtists[currentArtistIndex]?.artist}
            />

            <CupidoMusicalCard
              src={availableArtists[nextArtistIndex + 1]?.imageURL}
              alt={availableArtists[nextArtistIndex + 1]?.artist}
              next='next'
            />

            <div className='cupido__btn'>
              <CupidoMusicalButton
                onClick={handleLikeArtist}
                img={smIcons.like}
                alt='like'
              />
              <CupidoMusicalButton
                onClick={handleDislikeArtist}
                img={smIcons.cross}
                alt='Dislike'
              />
            </div>

            <h2 className='cupido__title'>
              {availableArtists[currentArtistIndex]?.artist}
            </h2>

            <div className='cupido-matches-container'>
              <span className='cupido__matches-sub_title'>
                Matches actuales:
              </span>
              <div className='cupido__matches'>
                <CupidoMusicalButton
                  onClick={handleRewindArtist}
                  img={smIcons.rewind}
                  alt='history'
                />
              </div>
            </div>

            <div className='cupido-matches-likes'>
              {likeList.map((artist, index) => (
                <div key={index} className='miniCover'>
                  <img src={artist?.imageURL} alt={artist?.artist} />
                </div>
              ))}
            </div>

            <ButtonStandard
              text='Crear Playlist'
              state={
                likeList.length <= 6 && likeList.length != 0
                  ? 'active'
                  : 'disabled'
              }
              onClick={handleCreatePlaylist}
            />
          </div>
        </>
      )}
    </AppContainer>
  );
};
