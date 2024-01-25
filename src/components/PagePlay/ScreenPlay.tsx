import { useGameStateStoreContext } from "@/contexts/GameStateContext";
import { Container } from "@mantine/core";
import { FlashcardTextEditor } from "../FlashcardTextEditor/FlashcardTextEditor";

export const ScreenPlay = () => {
  const { flashcards } = useGameStateStoreContext();
  const flashcard = flashcards[0];

  console.log(flashcard);
  return (
    <Container>
      <FlashcardTextEditor content={flashcard.prompt} editable={false} />
      <FlashcardTextEditor content={flashcard.response} editable={false} />
    </Container>
  );
};
