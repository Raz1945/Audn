import { smIcons } from "../../assets/icons";
import "./styles.css";

export const ButtonShare = ({ to }) => {

  const handleClick = (e) => {
    console.log("Compartir/Share");

  };

  return (
    <button className="share-container" onClick={handleClick}>
      <img
        src={smIcons.share}
        alt="share"
        className="share"
      />
    </button>
  );
};
