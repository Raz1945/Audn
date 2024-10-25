import '../CupidoMusical.card/index.css'

export const CupidoMusicalCard = ({ src, alt, next }) => {
  return (
    <>
        <div className={`cover ${next}`}>
          <img
            src={src}
            alt={alt}
          />
        </div>
    </>
  );
}
