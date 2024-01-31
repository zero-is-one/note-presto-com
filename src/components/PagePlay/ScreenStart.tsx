import { LayoutSimpleBar } from "@/components/LayoutSimpleBar/LayoutSimpleBar";
import { useMicrophoneContext } from "@/contexts/MicrophoneContext";
import { useDeckStoreContext } from "@/hooks/useDeckStoreContext";
import { useGameStateContextActions } from "@/hooks/useGameStateContext";
import { Button, Card, Container, Text, Title } from "@mantine/core";

export const ScreenStart = () => {
  const { requestMicrophone } = useMicrophoneContext();
  const deckStore = useDeckStoreContext();
  const deck = deckStore.getState();
  const { initializeFromDeck } = useGameStateContextActions();

  const play = async () => {
    const result = await requestMicrophone();
    if (!result) return alert("no microphone");
    initializeFromDeck(deck);
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
