import { Link } from 'react-router-dom';
import './index.css';

export const ButtonLink = ({
  hierarchy = 'primary',
  state = 'active',
  icon_left,
  icon_right,
  text = 'label-text',
  to,
  tabindex,
  type = state === 'active' ? 'submit' : 'button',

}) => {
  // Testeamos que funcione
  const onClick = () => {
    console.log('click');
  }

  return (
    <>
      <Link to={to} className="btn-link" tabIndex='-1'>
        <button
          disabled={state === 'disabled'}
          type={type}
          data-testid="btn-standard"
          id="btn-login-standard"
          className={`btn-container btn-text ${hierarchy} ${state}`}
          tabIndex={tabindex}
          
          onClick={onClick} // todo eliminar
        >
          {icon_left}
          <span>{text}</span>
          {icon_right}
        </button>
      </Link>
    </>
  );
};
