import './index.css';
import { useState, useEffect } from "react"
import { smIcons } from "../../../assets/icons"
import { useLocation } from "react-router-dom";
import { SidebarElement } from "./SidebarElement"

export const Sidebar = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const location = useLocation();

  useEffect(() => {
    //* Agregar más rutas según sea necesario para activar el icono correspondiente
    switch (location.pathname) {
      case '/dashboard/home':
        setActiveIcon(smIcons.home.active);
        break;
      case "/dashboard/search":
        setActiveIcon(smIcons.search.active);
        break;
      case "/dashboard/profile":
        setActiveIcon(smIcons.user.active);
        break;
      case '/dashboard/profile/cupidoMusical/pl':
        setActiveIcon(smIcons.user.active);
        break;
      case "/dashboard/friends":
        setActiveIcon(smIcons.friends.active);
        break;

      default:
        setActiveIcon(null);
    }
  }, [location]);

  return (
    <nav className="sidebar-container">
      <SidebarElement
        route='home'
        text='Inicio'
        icon={smIcons.home}
        isActive={activeIcon === smIcons.home.active}
        onClick={() => setActiveIcon(smIcons.home.active)}
      />
      <SidebarElement
        route="search"
        text="Buscar"
        icon={smIcons.search}
        isActive={activeIcon === smIcons.search.active}
        onClick={() => setActiveIcon(smIcons.search.active)}
      />
      <SidebarElement
        route="profile"
        text="Perfil"
        icon={smIcons.user}
        isActive={activeIcon === smIcons.user.active}
        onClick={() => setActiveIcon(smIcons.user.active)}
      />
      <SidebarElement
        route="friends"
        text="Amigos"
        icon={smIcons.friends}
        isActive={activeIcon === smIcons.friends.active}
        onClick={() => setActiveIcon(smIcons.friends.active)}
      />
    </nav>
  )
}
