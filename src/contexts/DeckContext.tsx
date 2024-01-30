import { Deck } from "@/types";
import { ReactNode, createContext, useState } from "react";
import { StoreApi, UseBoundStore, create } from "zustand";

const getDefaultDeck = (): Deck => ({
  name: "",
  description: "",
  flashcards: [],
});

const createStore = (deck: Deck) =>
  create<Deck>(() => ({
    ...deck,
  }));

export const StoreContext = createContext<UseBoundStore<StoreApi<Deck>>>(
  createStore(getDefaultDeck()),
);

export const StoreProvider: React.FC<{ children: ReactNode; deck: Deck }> = ({
  children,
  deck,
}) => {
  const [store] = useState(() => createStore(deck));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
