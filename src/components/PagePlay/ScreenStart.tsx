import { LayoutSimpleBar } from "@/components/LayoutSimpleBar/LayoutSimpleBar";
import { useGameStateStoreContext } from "@/contexts/GameStateContext";

import { DeckContainer } from "@/hooks/useDeck";

import { useMicrophoneContext } from "@/contexts/MicrophoneContext";
import { Button, Card, Container, Text, Title } from "@mantine/core";

export const ScreenStart = () => {
  const { requestMicrophone } = useMicrophoneContext();
  const { deck } = DeckContainer.useContainer();
  const { setFlashcards } = useGameStateStoreContext();

  const play = async () => {
    const result = await requestMicrophone();
    if (!result) return alert("no microphone");

    setFlashcards(deck?.flashcards || []);
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
