import { useDeckContainer } from "@/hooks/useDeck";
import { GameDataContainer, useGameDataContainer } from "@/hooks/useGameData";
import { ScreenPlay } from "./ScreenPlay";
import { ScreenStart } from "./ScreenStart";

export const PagePlay = () => {
  return (
    <GameDataContainer.Provider initialState={{ flashcards: [] }}>
      <Screen />
    </GameDataContainer.Provider>
  );
};

const Screen = () => {
  const { deck } = useDeckContainer();
  const { flashcards } = useGameDataContainer();

  if (!deck) return <div>Deck not found</div>;
  if (flashcards.length === 0) return <ScreenStart />;

  return <ScreenPlay />;
};
