import { Card } from "../ui/Card/Card";
import { CardGrid } from "../ui/CardGrid/CardGrid";
import { Section } from "../ui/Section/Section";
import { MainContent } from "../layout/MainContent/MainContent";


export const HomePage = () => {
  return (
    <MainContent title="Home">
      <Section title="Made for You">
        <CardGrid>
          <Card
            title="New Music Mix"
            subtitle="Billie Eilish, ZAYN, Omar Apollo..."
          />
          <Card title="The Songwriters" subtitle="Brandy Clark" />
          <Card title="Discovery Station" subtitle="Personalized for you" />
        </CardGrid>
      </Section>

      <Section title="Recently Played">
        <CardGrid>
          <Card title="Deeper Well" subtitle="Kacey Musgraves" />
          <Card title="Fearless Movement" subtitle="Anderson .Paak" />
          <Card title="Live 2024" subtitle="Peggy Gou" />
        </CardGrid>
      </Section>
    </MainContent>
  );
};
