import { useState } from "react"
import { cover } from "../../../assets/covers"
import { smIcons } from "../../../assets/icons"
import { ButtonShare } from "../../ButtonShare/ButtonShare"
import { AppContainer } from "../../other/AppContainer/AppContainer"
import { NavbarBottom } from "../../other/NavBarBottom/NavBarBottom"
import { PlaylistNav } from "../../Playlist/PlaylistNav"
import './styles.css'
import { Toast } from "../../Toast/Toast"

export const CupidoMusicalPlaylistCreate = () => {

  const [toast, setToast] = useState(null);
  const showToast = (message, icon = null) => {
    setToast({ message, icon });
  }

  const [isShuffle, setIsShuffle] = useState(false);
  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    showToast(isShuffle ? "Aleatorio desactivado ❌" : "Aleatorio activado 🔀");
  };

  return (
    <AppContainer>
      <PlaylistNav />
      <div className="playlist-container">

        {/* Imagen */}
        <div className="playlist-cover">
          {/*//todo - Cambiar por endpoint correspondiente */}
          <img
            src={cover.wos.img}
            alt={cover.wos.alt}
          />
        </div>


        <div className="playlist-info">
          <div className="playlist-info__left">
            <img src={smIcons.logo} alt="Logo" />
            <img src={smIcons.verified} alt="Verificado" />
            <ButtonShare />
          </div>

          <div className="playlist-info__right">
            {/*//todo - Cambiar por endpoint correspondiente */}
            <span >1h 33m</span>
            <img src={smIcons.history.active} alt="tiempo" />
          </div>
        </div>

        <div className="playlist-btns">
          {/*//todo -  Cambiar por endpoint correspondiente para copiar la lista e ingrasar el nuevo nombre de la lista */}
          {/*           Deberia de salir un modal para agregar el nombre de la nueva playlist */}
          <button
            className="playlist-btns__left"
            onClick={() => showToast("Funcionalidad en desarrollo 🚧")}
          >
            <img src={smIcons.copy} alt="btn copy" />
            <span>Crear Copia</span>
          </button>


          <div className="playlist-btns__right">
            <button
              onClick={toggleShuffle}
              className="playlist-btns__shuffle"
            >
              <img src={smIcons.shuffle.active} alt="btn shuffle" />
            </button>

            <button
              onClick={() => showToast("Reproduciendo ▶️")}

              className="playlist-btns__play">
              <img src={smIcons.play} alt="btn play" />
            </button>
          </div>
        </div>



      </div>
      <NavbarBottom />

      {/* Render condicional del Toast */}
      {toast && (
        <Toast
          text={toast.message}
          icon={toast.icon}
          duration={2000}
          onClose={() => setToast(null)}
        />
      )}

    </AppContainer>
  )
}
