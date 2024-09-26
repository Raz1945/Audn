import { Link } from "react-router-dom"
import { ArrowLeft } from "../../icons/ArrowLeft";
import './index.css';

export const Navbar = ({
  to,
  tabIndex,
  label,
  text
}) => {
  return (
    <div className="navbar">
      <Link
        to={to}
        tabIndex={tabIndex}
        className="navbar-link"
        aria-label={label}>
        <ArrowLeft />
      </Link>
      <p className="navbar-text">{text}</p>
    </div>


  )
}
