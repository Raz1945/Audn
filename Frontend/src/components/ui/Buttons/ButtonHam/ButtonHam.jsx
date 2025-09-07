import { useState, useRef, useEffect } from "react";
import { smIcons } from "../../../../assets/icons/index";
import "./styles.css";

export const ButtonHam = ({ options = [] }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cierra el dropdown si haces clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="config-container" ref={dropdownRef}>
      <button className="config-button" onClick={() => setOpen(!open)}>
        <img src={smIcons.ham.v} alt="ham menu" className="config-icon" />
      </button>

      {open && (
        <div className="dropdown-menu">
          {options.map((opt, idx) => (
            <button key={idx} className="dropdown-item" onClick={opt.onClick}>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>

  );
};
