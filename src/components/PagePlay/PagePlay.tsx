import {
  GameStateStoreProvider,
  useGameStateStore,
} from "@/contexts/GameStateContext";
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
  const flashcards = useGameStateStore()((s) => s.flashcards);
  if (flashcards.length === 0) return <ScreenStart />;

  return <ScreenPlay />;
};
