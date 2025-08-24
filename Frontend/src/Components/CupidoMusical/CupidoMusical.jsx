import axios from 'axios';
import { useEffect, useState } from 'react';
import { AppContainer } from '../other/AppContainer/AppContainer';
import { CupidoMusicalHeader } from './CupidoMusical.header/CupidoMusical.header';
import { Loader } from '../Loaders/Loader/Loader';
import { CupidoMusicalCard } from './CupidoMusical.card/CupidoMusical.card';
import { CupidoMusicalButton } from './CupidoMusicalButton/CupidoMusicalButton';
import { smIcons } from '../../assets/icons';
import { ButtonStandard } from '../ButtonStandard/ButtonStandard';
import { useNavigate } from 'react-router-dom';
import './index.css';


//! ELIMINAR LOS LOGS ANTES DE DAR POR TEMINADO ESTE COMPONENTE


export const CupidoMusical = () => {
  const apiUrl = import.meta.env.VITE_API_BACKEND_URL;
  const navigate = useNavigate();

  const [likeList, setLikeList] = useState([]); // Artistas que el usuario ha marcado con "like"
  const [artists, setArtists] = useState([]); // Artistas disponibles
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0); // Índice del artista actual
  const [nextArtistIndex, setNextArtistIndex] = useState(1); // Índice del siguiente artista
  const [availableArtists, setAvailableArtists] = useState([]); // Artistas disponibles para mostrar (no en likeList)
  const [loading, setLoading] = useState(true); // Estado de carga de los datos
  const [error, setError] = useState(null); // Mensaje de error en caso de fallo

  
  // Obtener los artistas desde la API al montar el componente
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/flow/artists`); // Petición a la API
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
    alert('¡Has alcanzado el límite de 6 likes!');
    return;
  }

  const currentArtist = availableArtists[currentArtistIndex];
  console.log("❤️ Likeando artista:", currentArtist); // log del artista actual
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
    console.log("🔑 Token desde localStorage:", token);
    
    if (!token) throw new Error("No hay token de usuario");
    
    // Verifica que apiUrl esté correcto
    console.log("🌐 API URL:", apiUrl);
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      withCredentials: true
    };

    console.log("📤 Enviando request...");
    
    const response = await axios.post(
      `${apiUrl}/flow/pl/cupido`,
      { artists: likeList.map(a => a.id) },
      config
    );

    console.log("✅ Response:", response.data);
    navigate('/cupidoMusical/pl'); // Redirigir a la página de éxito
  } catch (err) {
    console.error("❌ Error completo:", err);
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);
    console.error("Headers:", err.response?.headers);
    
    if (err.response?.status === 401) {
      alert("Token inválido o expirado. Por favor, volvé a loguearte.");
      localStorage.removeItem("token");
      // Redirigir al login
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
          </div>
        </>
      )}
    </AppContainer>
  );
};
