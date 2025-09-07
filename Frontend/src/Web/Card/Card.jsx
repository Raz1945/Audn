export const Card = ({ image, title, subtitle }) => {
  return (
    <div className="rounded-lg shadow hover:shadow-lg transition p-2 bg-white">
      {image && <img src={image} alt={title} className="rounded-md mb-2" />}
      <h3 className="font-semibold">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
};
