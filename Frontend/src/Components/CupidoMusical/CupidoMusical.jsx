import { useEffect } from "react";
import { AppContainer } from "../other/AppContainer/AppContainer"
import CupidoMusicalHeader from "./CupidoMusical.header/CupidoMusical.header"
import { useState } from "react";

import artistsData from '../../data/songs.json';
import { Loader } from "../Loaders/Loader/Loader";

// TODO      
export const CupidoMusical = () => {

  const [likeList, setLikeList] = useState([]);                       // Estado para almacenar los artistas con like
  const [artists, setArtists] = useState([]);                         // Estado para almacenar todos los artistas que estan disponibles
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);    // Estado para almacenar el indice del artista actual
  const [likedArtist, setLikedArtist] = useState([]);                 // Estado para almacenar los artistas con like
  const [availableArtists, setAvailableArtists] = useState([]);       // Estado para almacenar los artistas disponibles para mostrar

  // Cargar artistas desde el JSON al montar el componente
  useEffect(() => {
    setArtists(artistsData);
  }, []);

  useEffect(() => {
    const filteredArtists = artists.filter((artists) => !likedArtist.includes(artists));
    setAvailableArtists(filteredArtists);
    // console.log('Artistas con like:', likedArtist);

  }, [artists, likedArtist]);

  const handleLikeArtist = () => {
    // Verificamos si alcanzo el limite 
    if (likeList.length >= 6) {
      alert('¡Has alcanzado el límite de 6 likes!');
      return;
    }
    const currentArtist = availableArtists[currentArtistIndex];
    setLikeList((prevLikes) => [...prevLikes, currentArtist]);                        // Agregamos el artista actual a la lista de 'likes'
    setCurrentArtistIndex((prevLikes) => (prevLikes + 1) % availableArtists.length)   // Avanzamos al siguiente artista disponible o retornamos al inicio
    setLikedArtist((prevLikedArtists => [...prevLikedArtists, currentArtist]))        // Movemos el artista actual a la lista de artistas con 'likes'
  }

  const handleDislikeArtist = () => {
    setCurrentArtistIndex((prevIndex) => (prevIndex + 1) % availableArtists.length);
  };

  const handleRewindArtis = () => {
    // Verificamos si hay algun artista en la lista de likes antes de intentar eliminar
    if (likeList.length === 0) {
      console.log('No hay artistas en la lista de likes para remover.');
      return;      
    }

    // obtenemos el ultimo artista de la lista de 'likes'
    const lastLikedArtist = likeList[likeList.length - 1];

    // Remover el ultimo artista de la lista de 'likes'
    setLikeList((prevIndex) => prevIndex.slice(0, -1));
    setLikedArtist((prevLikedArtists) => prevLikedArtists.filter((artists) => artists !== lastLikedArtist))
    console.log('Se removió el artista:', lastLikedArtist);
  }

  const handleCreatePlaylist = () => {
    alert('Se crea la playlists')
  }

  return (
    <>
      <AppContainer>
        {availableArtists.length === 0 ? (
          <Loader/>
        ) : (
          <>
            <CupidoMusicalHeader/>
          </>
        )}
      </AppContainer>
    </>
  )
}
