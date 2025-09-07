import { smIcons } from "../../../assets/icons";
import { ButtonGoBack } from "../../ButtonGoBack/ButtonGoBack";
import { ButtonHam } from "../../ButtonHam/ButtonHam";
import "./styles.css";

export const PlaylistNav = () => {
  return (
    <nav className="top_pl-navbar">
      {/* Volver atrás */}
      <ButtonGoBack to={`/dashboard/home`} />

      <div className="top_pl-navbar__texts">
        <p className="top_pl-navbar__subtitle">Generada del Cupido Musical</p>
        <h1 className="top_pl-navbar__title">Playlist Cupido Musical ❤️</h1>
      </div>

      {/* Configuraciones */}
      <ButtonHam
        options={[
          {
            label: (
              <>
                <img src={smIcons.edit.active} alt="bell" style={{ width: 16, height: 16, marginRight: 8 }} />
                Editar Playlist
              </>
            ),
            onClick: () => console.log("Editar")
          },
          {
            label: (
              <>
                <img src={smIcons.edit.inactive} alt="trash" style={{ width: 16, height: 16, marginRight: 8 }} />
                Eliminar Playlist
              </>
            ),
            onClick: () => console.log("Eliminar")
          },
        ]}
      />

    </nav>
  );
};
