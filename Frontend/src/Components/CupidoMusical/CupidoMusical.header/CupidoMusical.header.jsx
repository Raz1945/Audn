import { NavLink } from "react-router-dom";
import { smIcons } from "../../../assets/icons"; 
import '../CupidoMusical.header/styles.css'

const CupidoMusicalHeader = () => {
  return (
    <>
      <nav className="top-navbar">
        <NavLink to={`/dashboard/home`}>
          <img src={smIcons.leftArrow} alt="left Arrow" />
        </NavLink>

        <div className="top-navbar__texts">
          <p className="top-navbar__title">Cupido Musical</p>
        </div>
      </nav>
    </>
  );
}

export default CupidoMusicalHeader;