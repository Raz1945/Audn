import React, { useState, useEffect, useRef } from "react";
import { cover } from "../../../assets/covers";
import { smIcons } from "../../../assets/icons";
import { ButtonShare } from "../../ButtonShare/ButtonShare";
import { AppContainer } from "../../other/AppContainer/AppContainer";
import { NavbarBottom } from "../../other/NavBarBottom/NavBarBottom";
import { PlaylistNav } from "../../Playlist/PlaylistNav/PlaylistNav";
import { Toast } from "../../Toast/Toast";
import "./styles.css";

export const CupidoMusicalPlaylistCreate = () => {
  const [toast, setToast] = useState(null);
  const [isShuffle, setIsShuffle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const tracksRef = useRef(null);

  const showToast = (message, icon = null) => {
    setToast({ message, icon });
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    showToast(isShuffle ? "Aleatorio desactivado ❌" : "Aleatorio activado 🔀");
  };

  // Detectar scroll
  useEffect(() => {
    const el = tracksRef.current;
    if (!el) return;

    const handleScroll = () => {
      setScrolled(el.scrollTop > 50);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const tracks = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Track ${i + 1}`,
    artist: `Artista ${i + 1}`,
    img: cover.wos.img
  }));

  return (
    <AppContainer>
      <PlaylistNav />

      <div className="playlist-container">

        {/* Cover con animación */}
        <div className={`playlist-cover fade-block ${scrolled ? "hidden" : ""}`}>
          <img src={cover.wos.img} alt={cover.wos.alt} />
        </div>

        {/* Info con animación */}
        <div className={`playlist-info fade-block ${scrolled ? "hidden" : ""}`}>
          <div className="playlist-info__left">
            <img src={smIcons.logo} alt="Logo" />
            <img src={smIcons.verified} alt="Verificado" />
            <ButtonShare />
          </div>
          <div className="playlist-info__right">
            <span>1h 33m</span>
            <img src={smIcons.history.active} alt="tiempo" />
          </div>
        </div>

        {/* Searchbar (aparece más tarde y suave) */}
        {/* //todo modificar esta ocupando lugar mal */}
        {/* <div className={`playlist-searchbar ${scrolled ? "visible" : ""}`}>
          <input type="text" placeholder="Buscar en playlist..." />
          <button onClick={() => showToast("Filtros 🚧")}>
            <img src={smIcons.filter} alt="Filtros" />
          </button>
        </div> */}

        {/* Botones */}
        <div className="playlist-btns">
          <button
            className="playlist-btns__left"
            onClick={() => showToast("Funcionalidad en desarrollo 🚧")}
          >
            <img src={smIcons.copy} alt="btn copy" />
            <span>Crear Copia</span>
          </button>

          <div className="playlist-btns__right">
            <button onClick={toggleShuffle} className="playlist-btns__shuffle">
              <img src={smIcons.shuffle.active} alt="btn shuffle" />
            </button>
            <button
              onClick={() => showToast("Reproduciendo ▶️")}
              className="playlist-btns__play"
            >
              <img src={smIcons.play} alt="btn play" />
            </button>
          </div>
        </div>

        {/* Lista de canciones */}
        <div ref={tracksRef} className="playlist-tracks">
          {tracks.map((track) => (
            <div key={track.id} className="playlist-tracks__item">
              <img src={track.img} alt={track.title} />
              <div className="playlist-tracks__info">
                <span className="playlist-tracks__title">{track.title}</span>
                <span className="playlist-tracks__artist">{track.artist}</span>
              </div>
              <button onClick={() => showToast("Funcionalidad en desarrollo 🚧")}>
                <img src={smIcons.ham.v} alt="Configuraciones" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <NavbarBottom />

      {toast && (
        <Toast
          text={toast.message}
          icon={toast.icon}
          duration={2000}
          onClose={() => setToast(null)}
        />
      )}
    </AppContainer>
  );
};
