import './styles.css'
const HomeCardsContainer = ({ children }) => {

  return (
    <main className="cards-container">
      {children}
    </main>
  );
}

export default HomeCardsContainer;
