import axios from 'axios';
import { useEffect, useState } from 'react';
import { AppContainer } from '../other/AppContainer/AppContainer';
import { CupidoMusicalHeader } from './CupidoMusical.header/CupidoMusical.header';
import { Loader } from '../Loaders/Loader/Loader';
import { CupidoMusicalCard } from './CupidoMusical.card/CupidoMusical.card';
import { CupidoMusicalButton } from './CupidoMusicalButton/CupidoMusicalButton';
import { smIcons } from '../../assets/icons';
import { ButtonStandard } from '../ButtonStandard/ButtonStandard';
import './index.css';

export const CupidoMusical = () => {
  const apiUrl = import.meta.env.VITE_API_BACKEND_URL;

  const [likeList, setLikeList] = useState([]);
  const [artists, setArtists] = useState([]);
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [nextArtistIndex, setNextArtistIndex] = useState(1);
  const [availableArtists, setAvailableArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/flow/artists`);
        setArtists(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener datos:', err);
        setError('Error al obtener los datos de artistas.');
        setLoading(false);
      }
    };

    fetchArtists();
  }, [apiUrl]);

  useEffect(() => {
    const filteredArtists = artists.filter(
      (artist) => !likeList.some((liked) => liked.id === artist.id)
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

    const lastLikedArtist = likeList[likeList.length - 1];
    setLikeList((prevLikes) => prevLikes.slice(0, -1));
    if (availableArtists[currentArtistIndex]?.id === lastLikedArtist.id) {
      setCurrentArtistIndex(nextArtistIndex);
      setNextArtistIndex((nextArtistIndex + 1) % availableArtists.length);
    }
  };

  const handleCreatePlaylist = () => {
    alert('Se crea la playlist');
    console.log('Se crea la playlist');
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <AppContainer>
      {availableArtists.length === 0 ? (
        <div className="empty-message">No hay artistas disponibles</div>
      ) : (
        <>
          <CupidoMusicalHeader />
          <div className="cupido-container">
            <CupidoMusicalCard
              src={availableArtists[currentArtistIndex]?.imageURL}
              alt={availableArtists[currentArtistIndex]?.name}
            />

            {availableArtists.length > 1 && (
              <CupidoMusicalCard
                src={availableArtists[nextArtistIndex]?.imageURL}
                alt={availableArtists[nextArtistIndex]?.name}
                next="next"
              />
            )}

            <div className="cupido__btn">
              <CupidoMusicalButton
                onClick={handleLikeArtist}
                img={smIcons.like}
                alt="like"
              />
              <CupidoMusicalButton
                onClick={handleDislikeArtist}
                img={smIcons.cross}
                alt="Dislike"
              />
            </div>

            <h2 className="cupido__title">
              {availableArtists[currentArtistIndex]?.name}
            </h2>

            <div className="cupido-matches-container">
              <span className="cupido__matches-sub_title">
                Matches actuales:
              </span>
              <div className="cupido__matches">
                <CupidoMusicalButton
                  onClick={handleRewindArtist}
                  img={smIcons.rewind}
                  alt="history"
                />
              </div>
            </div>

            <div className="cupido-matches-likes">
              {likeList.map((artist, index) => (
                <div key={index} className="miniCover">
                  <img src={artist?.imageURL} alt={artist?.name} />
                </div>
              ))}
            </div>

            <ButtonStandard
              text="Crear Playlist"
              state={
                likeList.length <= 6 && likeList.length !== 0
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
