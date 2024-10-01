import './index.css'

export const InputInstruction = ({ focus, refe, valid, children }) => {
  return (
    <>
      <div className={`instructions__wrapper ${focus && refe && !valid ? 'onscreen' : ''}`}>
        <div className='instructions__text_wrapper'>
          {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
          <span id="uidnote" className="instructions__text">
            {children}
          </span>
        </div>
      </div>
    </>
  );
}