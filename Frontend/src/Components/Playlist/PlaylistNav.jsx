import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { smIcons } from "../../assets/icons";
import "./styles.css";

export const PlaylistNav = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cierra el dropdown si haces clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="top_pl-navbar">
        {/* Volver atras */}
        <NavLink to={`/dashboard/home`}>
          <img src={smIcons.leftArrow} alt="left Arrow" />
        </NavLink>

        <div className="top_pl-navbar__texts">
          <p className="top_pl-navbar__subtitle">Generada del Cupido Musical</p>
          <h1 className="top_pl-navbar__title">Playlist Cupido Musical ❤️</h1>
        </div>

        {/* Configuraciones */}
        <div className="config-container" ref={dropdownRef}>
          <img
            src={smIcons.ham.v}
            alt="ham menu"
            onClick={() => setOpen(!open)}
            style={{ cursor: "pointer" }}
          />

          {open && (
            <div className="dropdown-menu">
              <button className="dropdown-item">Editar Playlist</button>
              <button className="dropdown-item">Eliminar Playlist</button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
