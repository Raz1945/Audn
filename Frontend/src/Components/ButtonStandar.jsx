import './styles.css'

const ButtonStandar = ({ text, state, onClick }) => {
  return (
    <div className="btn-container" onClick={onClick}>
      <div className={state}>
        <p className="btn__text">
          {text}
        </p>
      </div>
    </div>
  );
}

export default ButtonStandar;