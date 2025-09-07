import { useNavigate } from "react-router-dom";
import { smIcons } from "../../../../assets/icons/index";
import "./styles.css";

export const ButtonGoBack = ({ to }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.currentTarget.classList.add("animate-out");

    setTimeout(() => {
      navigate(to);
    }, 300); // esperar la animación antes de redirigir
  };

  return (
    <button className="goback-container" onClick={handleClick}>
      <img
        src={smIcons.leftArrow}
        alt="Go back"
        className="goback"
      />
    </button>
  );
};
