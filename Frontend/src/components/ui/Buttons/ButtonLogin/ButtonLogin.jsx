import './index.css';

export const ButtonLogin = ({
  hierarchy = 'primary',
  state = 'active',
  icon_left,
  icon_right,
  text = 'Iniciar sesión', // Texto por defecto
  tabindex,
  type = 'submit',  // Tipo submit para envío de formulario
}) => {
  return (
    <button
      disabled={state === 'disabled'}
      type={type} 
      className={`btn-container-log btn-text-log ${hierarchy} ${state}`}
      tabIndex={tabindex} 
    >
      {icon_left && <span className="icon-left">{icon_left}</span>}
      <span>{text}</span>
      {icon_right && <span className="icon-right">{icon_right}</span>}
    </button>
  );
};
