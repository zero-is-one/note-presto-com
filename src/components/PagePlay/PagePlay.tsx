import { StoreProvider as GameStateStoreProvider } from "@/contexts/GameStateContext";

import { useGameStateStoreContext } from "@/hooks/useGameStateContext";
import { DeckResource } from "../DeckResource/DeckResource";
import { ScreenPlay } from "./ScreenPlay";
import { ScreenStart } from "./ScreenStart";

export const PagePlay = () => {
  return (
    <DeckResource>
      <GameStateStoreProvider>
        <Screen />
      </GameStateStoreProvider>
    </DeckResource>
  );
};

const Screen = () => {
  const flashcards = useGameStateStoreContext()((s) => s.flashcards);
  if (flashcards.length === 0) return <ScreenStart />;

  return <ScreenPlay />;
};
