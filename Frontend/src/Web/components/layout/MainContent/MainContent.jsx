export const MainContent = ({ title, children }) => {
  return (
    <div className="p-6">
      {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
      <div>{children}</div>
    </div>
  );
};

