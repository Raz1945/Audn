import { useState } from "react";
import { smIcons } from "../../assets/icons";
import "./styles.css";

export const ButtonShare = ({ to }) => {
  const [showToast, setShowToast] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(to);
      setShowToast(true);

      // ocultar automáticamente el aviso después de 2s
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
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
        <div className="toast">
          📋 Enlace copiado
        </div>
      )}
    </>
  );
};
