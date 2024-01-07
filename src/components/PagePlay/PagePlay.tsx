import { LayoutSimpleBar } from "@/components/LayoutSimpleBar/LayoutSimpleBar";
import { useDeckContainer } from "@/hooks/useDeck";
import { GameDataContainer } from "@/hooks/useGameData";
import { Start } from "./Start";

export const PagePlay = () => {
  const { deck } = useDeckContainer();

  if (!deck) return null;

  return (
    <GameDataContainer.Provider initialState={{ flashcards: deck?.flashcards }}>
      <LayoutSimpleBar>
        <Start />
      </LayoutSimpleBar>
    </GameDataContainer.Provider>
  );
};
