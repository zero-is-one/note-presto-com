import { Flashcard } from "@/types";
import { ReactNode, createContext, useState } from "react";
import { StoreApi, UseBoundStore, create } from "zustand";

type FlashcardWithStats = Flashcard & {
  updatedAt: Date;
  streak: number;
  correct: number;
  incorrect: number;
};

interface GameState {
  flashcards: FlashcardWithStats[];
}

const createStore = () =>
  create<GameState>(() => ({
    flashcards: [],
  }));

export const StoreContext = createContext<UseBoundStore<StoreApi<GameState>>>(
  createStore(),
);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [store] = useState(() => createStore());

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
