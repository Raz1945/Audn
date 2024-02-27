import { Link } from 'react-router-dom';
import './index.css';

export const ButtonStandard = ({
  hierarchy = 'primary',
  state = 'active',
  icon_left,
  icon_right,
  text = 'label-text',
  to,
  tabindex
}) => {
  return (
    <>
      <Link to={to} className="btn-link" tabIndex={tabindex}>
        <button
          disabled={state === 'disabled'}
          type="button"
          data-testid="btn-standard"
          id="btn-login-standard"
          className={`btn-container btn-text ${hierarchy} ${state}`}
          tabIndex='-1'
        >
          {icon_left}
          <span>{text}</span>
          {icon_right}
        </button>
      </Link>
    </>
  );
};
