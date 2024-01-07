import { Flashcard } from "@/types";
import { useState } from "react";
import { createContainer } from "unstated-next";

export type GameData = {
  flashcards: Flashcard[];
};

export const useGameData = (initialState?: GameData) => {
  if (!initialState) {
    throw Error("initialState is required");
  }

  const [gameData, setGameData] = useState<GameData>(initialState);
  return { gameData, setGameData };
};

export const GameDataContainer = createContainer(useGameData);
export const useGameDataContainer = GameDataContainer.useContainer;
