import { useEffect, useState } from "react";
import "./styles.css";

export const Toast = ({ text, icon = null, duration = 2000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`toast`}>
      {icon && <span className="toast-icon">{icon}</span>}
      <span>{text}</span>
    </div>
  );
};
