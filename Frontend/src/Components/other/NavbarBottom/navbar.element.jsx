import { NavLink } from "react-router-dom";

const NavbarElement = ({ text, route, icon, isActive, onClick }) => {
  return (
    <div onClick={onClick}>
      <NavLink to={`/dashboard/${route}`}>
        <div className={`navbar__element ${isActive ? "active" : "inactive"}`}>
          <img src={isActive ? icon.active : icon.inactive} alt="Icono" />
          <p className="navbar__text">{text}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default NavbarElement;
