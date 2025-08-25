import { cover } from "../../../assets/covers"
import { smIcons } from "../../../assets/icons"
import { AppContainer } from "../../other/AppContainer/AppContainer"
import { NavbarBottom } from "../../other/NavBarBottom/NavBarBottom"
import { PlaylistNav } from "../../Playlist/PlaylistNav"
import './styles.css'

const CupidoMusicalPlaylistCreate = () => {


  return (
    <AppContainer>
      <PlaylistNav />
      <div className="playlist-container">


        {/* Imagen */}
        <div className="playlist-cover">
          {/* Remplazar por endpoint  */}
          <img
            src={cover.wos.img}
            alt={cover.wos.alt}
          />
        </div>


        <div className="playlist-info">
          <div className="playlist-info__left">
            <img src={smIcons.logo} alt="Logo" />
            <img src={smIcons.verified} alt="Verificado" />

            {/* Cambiar para que parezca que copio el link (modal de aviso) */}
            <img src={smIcons.share} alt="compartir" />
          </div>

          <div className="playlist-info__right">
            {/*Cambiar por endpoint correspondiente */}
            <span >1h 33m</span>
            <img src={smIcons.history.active} alt="tiempo" />
          </div>
        </div>

        <div className="playlist-btns">
          {/* Cambiar por endpoint correspondiente para copiar la lista e ingrasar el nuevo nombre de la lista */}
          {/* Deberia de salir un modal para agregar el nombre de la nueva playlist */}
          <div className="playlist-btns__left">
            <img src={smIcons.copy} alt="btn copy" />
            <span>Crer Copia</span>
          </div>

          <div className="playlist-btns__right">
            {/* <button className="playlist-btns__shuffle"> */}
            <img src={smIcons.shuffle} alt="btn shuffle" />
            {/* </button> */}

            {/* <button className="playlist-btns__play"> */}
            <img src={smIcons.play} alt="btn play" />
            {/* </button> */}
          </div>
        </div>



      </div>
      <NavbarBottom />
    </AppContainer>
  )
}

export default CupidoMusicalPlaylistCreate