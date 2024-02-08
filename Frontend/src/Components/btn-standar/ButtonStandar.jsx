import './index.css';

export const ButtonStandar = ({
  hierarchy,
  state,
  icon_left,
  icon_right,
  text='label-text',
}) => {

   return (
    <div className={`btn__container ${hierarchy} ${state}`}>
      <div className='btn_label'>
        {icon_left}
        <p className='btn__text'>{text}</p>
        {icon_right}
      </div>
    </div>
  );
};
