import './index.css';

export const ButtonStandard = ({
  hierarchy = 'primary',
  state = 'active',
  icon_left,
  icon_right,
  text = 'label-text',
  tabindex,
  type = state === 'active' ? 'submit' : 'button',

}) => {
  const onClick = () => {
    console.log('click');
  }

  return (
    <>
        <button
          disabled={state === 'disabled'}
          type={type}
          data-testid="btn-standard"
          id="btn-login-standard"
          className={`btn-container btn-text ${hierarchy} ${state}`}
          tabIndex={tabindex}
          onClick={onClick}
        >
          {icon_left}
          <span>{text}</span>
          {icon_right}
        </button>
    </>
  );
};
