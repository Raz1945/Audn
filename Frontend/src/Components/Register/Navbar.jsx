import { Link } from "react-router-dom"
import { ArrowLeft } from "../icons/ArrowLeft";

export const Navbar = ({
  to,
  tabIndex,
  label,
  text
}) => {
  return (
    <div className="register__navbar">
      <Link
        to={to}
        tabIndex={tabIndex}
        className="register__navbar-link"
        aria-label={label}>
        <ArrowLeft />
      </Link>
      <p className="register__navbar-text">{text}</p>
    </div>


  )
}
