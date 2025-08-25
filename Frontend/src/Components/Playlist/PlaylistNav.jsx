import { ButtonGoBack } from "../ButtonGoBack/ButtonGoBack";
import { ButtonHam } from "../ButtonHam/ButtonHam";
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
          { label: "Editar Playlist", onClick: () => console.log("Editar") },
          { label: "Eliminar Playlist", onClick: () => console.log("Eliminar") },
        ]}
      />
    </nav>
  );
};
