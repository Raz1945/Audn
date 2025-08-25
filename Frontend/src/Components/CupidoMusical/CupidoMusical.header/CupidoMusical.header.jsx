import './styles.css'

export const CupidoMusicalHeader = () => {
  return (
    <>
      <nav className="top-navbar">
        <ButtonGoBack to={'/dashboard/home'} />

        <div className="top-navbar__texts">
          <p className="top-navbar__title">Cupido Musical</p>
        </div>
      </nav>
    </>
  );
}