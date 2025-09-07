import { useState } from "react";
import { smIcons } from "../../../../assets/icons";
import { Toast } from "../../../ui/Toast/Toast";
import "./styles.css";

export const ButtonShare = ({ to }) => {
  const [showToast, setShowToast] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(to);
      setShowToast(true);
    } catch (err) {
      console.error("Error al copiar enlace", err);
    }
  };

  return (
    <>
      <button className="share-container" onClick={handleClick}>
        <img src={smIcons.share} alt="share" className="share" />
      </button>

      {showToast && (
        <Toast
          text="Enlace copiado"
          icon="📋"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};
