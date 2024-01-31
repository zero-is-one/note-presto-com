import { StoreContext } from "@/contexts/GameStateContext";
import { Deck } from "@/types";
import { useContext } from "react";
const promotionTeirs = [
  3, 3, 5, 7, 14, 24, 48, 72, 96, 120, 144, 200, 300, 400, 500, 600, 700, 800,
  900, 1000,
];

export const useGameStateStoreContext = () => {
  return useContext(StoreContext);
};

export const useActiveFlashcard = () => {
  const flashcards = useGameStateStoreContext()((f) => f.flashcards);
  return flashcards[0];
};

export const useGameStateContextActions = () => {
  const { setState } = useGameStateStoreContext();

  const initializeFromDeck = (deck: Deck) => {
    const flashcardsWithStats = deck.flashcards.map((flashcard) => ({
      ...flashcard,
      streak: 0,
      correct: 0,
      incorrect: 0,
      updatedAt: new Date(),
    }));

    setState({
      flashcards: flashcardsWithStats,
    });
  };

  const promote = () => {
    setState((state) => {
      const [current, ...rest] = state.flashcards;
      const hasPerfectStreak = current.correct > 0 && current.incorrect === 0;
      const streak = current.streak + (hasPerfectStreak ? 2 : 1);

      const updated = {
        ...current,
        streak,
        correct: current.correct + 1,
        updatedAt: new Date(),
      };

      const arrayPosition: number = Math.min(
        state.flashcards.length - 1,
        promotionTeirs[streak] + Math.floor(Math.random() * 4),
      );

      const flashcards = [...rest];
      flashcards.splice(arrayPosition, 0, updated);

      return {
        flashcards,
      };
    });
  };

  const demote = () => {
    setState((state) => {
      const [current, ...rest] = state.flashcards;

      const updated = {
        ...current,
        streak: 0,
        incorrect: current.incorrect + 1,
        updatedAt: new Date(),
      };

      const flashcards = [...rest];
      flashcards.splice(Math.floor(Math.random() * 4), 0, updated);

      return {
        flashcards,
      };
    });
  };

  return {
    initializeFromDeck,
    promote,
    demote,
  };
};
