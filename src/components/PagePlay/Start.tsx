import { DeckContainer } from "@/hooks/useDeck";
import { useGameDataContainer } from "@/hooks/useGameData";
import { Button, Card, Text, Title } from "@mantine/core";

export const Start = () => {
  const { deck } = DeckContainer.useContainer();
  const { gameData } = useGameDataContainer();

  return (
    <Card withBorder mb={"sm"}>
      <Title>{deck?.name}</Title>
      <Text>{gameData?.flashcards.length}</Text>
      <Button>Play</Button>
    </Card>
  );
};
