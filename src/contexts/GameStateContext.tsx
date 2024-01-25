// Provider and Context

import { Flashcard } from "@/types";
import { createStoreContext } from "@/utils/zustandStoreContext";
import { create } from "zustand";

const promotionTeirs = [
  3, 3, 5, 7, 14, 24, 48, 72, 96, 120, 144, 200, 300, 400, 500, 600, 700, 800,
  900, 1000,
];

type FlashcardWithStats = Flashcard & {
  streak: number;
  correct: number;
  incorrect: number;
  hasPerfectStreak: boolean;
};

interface GameState {
  flashcards: FlashcardWithStats[];
  promote: () => void;
  setFlashcards: (flashcards: Flashcard[]) => void;
}

const createGameStateStore = () =>
  create<GameState>((set) => ({
    flashcards: [],
    setFlashcards: (flashcards: Flashcard[]) => {
      const flashcardsWithStats = flashcards.map((flashcard) => ({
        ...flashcard,
        streak: 0,
        correct: 0,
        incorrect: 0,
        hasPerfectStreak: false,
      }));

      set({
        flashcards: flashcardsWithStats,
      });
    },
    promote: () => {
      set((state) => {
        const [current, ...rest] = state.flashcards;
        const streak = current.streak + (current.hasPerfectStreak ? 2 : 1);

        const updated = {
          ...current,
          streak,
          correct: current.correct + 1,
        };

        const arrayPosition: number =
          promotionTeirs.indexOf(streak) + Math.floor(Math.random() * 4);

        const flashcards = [...rest];
        flashcards.splice(arrayPosition, 0, updated);

        return {
          flashcards,
        };
      });
    },
  }));

export const [
  GameStateStoreProvider,
  useGameStateStoreContext,
  useGameStateStore,
] = createStoreContext(createGameStateStore);
