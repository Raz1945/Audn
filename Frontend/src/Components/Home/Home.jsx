import HomeHeader from "./Home.header/Home.header";
import HomeCardsContainer from "./Home.cards.container/Home.cards.container";
import HomeCard from "./Home.card/Home.card";

import { images } from "../../assets/images";

const Home = () => {
  return (
    <>
      <HomeHeader />
      <HomeCardsContainer>
        <HomeCard
          to={'/cupidoMusical'}
          img={`${images.cupido}`}
          title={'Cupido Musical'}
          subTitle={'Tus artistas favoritos nunca van a dejarte con el corazón roto.'}

        />
        <HomeCard
          to={'/musicaContextual'}
          img={`${images.contextual}`}
          title={'Música Contextual'}
          subTitle={'Creamos la playlist perfecta para cualquier situación.'}

        />
      </HomeCardsContainer>
    </>
  );
}

export default Home;