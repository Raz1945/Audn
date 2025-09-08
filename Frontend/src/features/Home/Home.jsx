import { HomeHeader } from "@features/Home/components/HomeHeader/HomeHeader";
import { HomeCardsContainer } from "@features/Home/components/HomeCardsContainer/HomeCardsContainer";
import { HomeCard } from "@features/Home/components/HomeCard/HomeCard";
import { images } from "@assets/images/index";

export const Home = () => {
  return (
    <>
      {/* // todo Revisar Header */}
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
