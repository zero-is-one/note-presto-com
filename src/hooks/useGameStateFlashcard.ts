import { useGameStateStoreContext } from "@/contexts/GameStateContext";

export const useGameStateFlashcard = () => {
  const { flashcards, promoteFlashcard, demoteFlashcard } =
    useGameStateStoreContext();
  const flashcard = flashcards[0];

  return {
    flashcards,
    promoteFlashcard,
    demoteFlashcard,
    flashcard,
  };
};
