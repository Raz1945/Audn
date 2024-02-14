import './index.css';
import { Link } from 'react-router-dom'; 

export const ButtonStandard = ({
  hierarchy = 'primary',
  state = 'active',
  icon_left,
  icon_right,
  text = 'label-text',
  to,
}) => {
  return (
    <Link to={to} className="btn-link">
      <button
        disabled={state === 'disabled'}
        type="button"
        data-testid="btn-standard"
        id="btn-login-standard"
        className={`btn-container btn-text ${hierarchy} ${state}`}
      >
        {icon_left}
        <span>{text}</span>
        {icon_right}
      </button>
    </Link>
  );
};
