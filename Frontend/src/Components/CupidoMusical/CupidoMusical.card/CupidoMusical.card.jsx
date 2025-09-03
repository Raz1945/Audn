import './index.css'

const fallbackImage = "https://i.imgur.com/aEKiDlB.jpeg";

export const CupidoMusicalCard = ({ src, alt, next }) => {
  return (
    <div className={`cover ${next}`}>
      <img
        src={src}
        alt={alt}
        onError={(e) => { e.currentTarget.src = fallbackImage }}
      />
    </div>
  );
};
