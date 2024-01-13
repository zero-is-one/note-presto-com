import { LayoutSimpleBar } from "@/components/LayoutSimpleBar/LayoutSimpleBar";
import { DeckContainer } from "@/hooks/useDeck";
import { useGameDataContainer } from "@/hooks/useGameData";
import { Button, Card, Container, Text, Title } from "@mantine/core";

export const ScreenStart = () => {
  const { deck } = DeckContainer.useContainer();
  const { setGameData } = useGameDataContainer();

  const play = () => {
    setGameData({ flashcards: deck?.flashcards || [] });
  };

  return (
    <LayoutSimpleBar>
      <Container>
        <Card withBorder mb={"sm"}>
          <Title>{deck?.name}</Title>
          <Text>{deck?.description}</Text>
          <Text>{deck?.flashcards.length}</Text>
          <Button onClick={play}>Play</Button>
        </Card>
      </Container>
    </LayoutSimpleBar>
  );
};
