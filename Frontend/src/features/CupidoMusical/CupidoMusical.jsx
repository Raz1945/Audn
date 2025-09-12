import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContainer } from '@components/layout/AppContainer/AppContainer';
import { Loader } from '@components/ui/Loaders/Loader/Loader';
import { ButtonStandard } from '@components/ui/Buttons/ButtonStandard/ButtonStandard';

import { CupidoMusicalHeader } from '@features/CupidoMusical/components/CupidoMusicalheader/CupidoMusicalheader';
import { CupidoMusicalCard } from '@features/CupidoMusical/components/CupidoMusicalCard/CupidoMusicalCard';
import { CupidoMusicalButton } from '@features/CupidoMusical/components/CupidoMusicalButton/CupidoMusicalButton';

import { smIcons } from '@assets/icons/index';
import './index.css';
import api from '@/api/axios';


//todo  EL 'POST' NO FUNCIONA, CORREGIR 
//todo  ELIMINAR LOS LOGS ANTES DE DAR POR TEMINADO ESTE COMPONENTE

export const CupidoMusical = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [likeList, setLikeList] = useState([]); // Artistas que el usuario ha marcado con "like"
  const [artists, setArtists] = useState([]); // Artistas disponibles
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0); // Índice del artista actual
  const [nextArtistIndex, setNextArtistIndex] = useState(1); // Índice del siguiente artista
  const [availableArtists, setAvailableArtists] = useState([]); // Artistas disponibles para mostrar (no en likeList)
  const [loading, setLoading] = useState(true); // Estado de carga de los datos
  const [error, setError] = useState(null); // Mensaje de error en caso de fallo
  const [showToast, setShowToast] = useState(false); // Estado para mostrar el toast
  const [toastMessage, setToastMessage] = useState('');

  // Obtener los artistas desde la API al montar el componente
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${apiUrl}/flow/artists`); // Petición a la API
        setArtists(response.data); // Guardar artistas en el estado
        setLoading(false);
      } catch (err) {
        setError('Error al obtener los datos de artistas.');
        setLoading(false);
      }
    };

    fetchArtists();
  }, [apiUrl]);


  // Filtrar artistas que no están en la lista de likes
  useEffect(() => {
    const filteredArtists = artists.filter((artist) => !likeList.includes(artist));
    setAvailableArtists(filteredArtists); // Actualizar la lista de artistas disponibles
  }, [artists, likeList]);


  // Manejar "like" de un artista con log
  const handleLikeArtist = () => {
    if (likeList.length >= 6) {
      setToastMessage('¡Has alcanzado el límite de 6 likes!');
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2000);

      return;
    }

    const currentArtist = availableArtists[currentArtistIndex];
    // log del artista actual
    console.log("❤️ Likeando artista:", currentArtist);
    setLikeList((prevLikes) => {
      const newLikes = [...prevLikes, currentArtist];
      console.log("📝 Lista de likes actualizada:", newLikes.map(a => ({ id: a?.id, name: a?.name })));
      return newLikes;
    });

    setCurrentArtistIndex(nextArtistIndex);
    setNextArtistIndex((nextArtistIndex + 1) % availableArtists.length);
  };

  // Manejar el "dislike" de un artista (avanzar al siguiente)
  const handleDislikeArtist = () => {
    setCurrentArtistIndex(nextArtistIndex); // Avanzar al siguiente artista
    setNextArtistIndex((nextArtistIndex + 1) % availableArtists.length); // Actualizar índice siguiente
  };

  // Deshacer un "like" (volver al último artista marcado)
  const handleRewindArtist = () => {
    if (likeList.length === 0) return;

    const lastLikedArtist = likeList[likeList.length - 1];
    setLikeList((prevLikes) => prevLikes.slice(0, -1)); // Eliminar el último "like"
    if (availableArtists[currentArtistIndex]?.id === lastLikedArtist.id) {
      setCurrentArtistIndex(nextArtistIndex); // Avanzar al siguiente artista si es necesario
      setNextArtistIndex((nextArtistIndex + 1) % availableArtists.length);
    }
  };

  // Crear playlist  
  const handleCreatePlaylist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token de usuario");

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true
      };

      const response = await api.post(
        `${apiUrl}/flow/pl/cupido`,
        { artists: likeList.map(a => a.id) },
        config
      );

      console.log("✅ Playlist creada:");

      const playlistUrl = response.data?.url || `${apiUrl}/flow/pl/cupido`;

      await navigator.clipboard.writeText(playlistUrl);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        // navigate('/cupidoMusical/pl');
        navigate('/dashboard/profile/cupidoMusical/pl');
      }, 2000);

    } catch (err) {
      console.error("❌ Error completo:", err);

      if (err.response?.status === 401) {
        alert("Token inválido o expirado. Por favor, volvé a loguearte.");
        localStorage.removeItem("token");
      }
    }
  };



  //Mostrar el Loader mientras se cargan los datos o un mensaje de error
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
              src={availableArtists[currentArtistIndex]?.image}
              alt={availableArtists[currentArtistIndex]?.name}
            />

            {availableArtists.length > 1 && (
              <CupidoMusicalCard
                src={availableArtists[nextArtistIndex]?.image}
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
                  <img src={artist?.image} alt={artist?.name} />
                </div>
              ))}
            </div>

            <ButtonStandard
              text="Crear Playlist"
              state={likeList.length >= 2 && likeList.length <= 6 ? 'active' : 'disabled'}
              onClick={handleCreatePlaylist}
            />

            {showToast && (
              <div className="toast">
                📋 Enlace copiado
              </div>
            )}

            {showToast && (
              <div className="toast">
                {toastMessage}
              </div>
            )}
          </div>
        </>
      )}
    </AppContainer>
  );
};
