import {
  GameStateStoreProvider,
  useGameStateStore,
} from "@/contexts/GameStateContext";
import { useDeckContainer } from "@/hooks/useDeck";
import { ScreenPlay } from "./ScreenPlay";
import { ScreenStart } from "./ScreenStart";

export const PagePlay = () => {
  return (
    <GameStateStoreProvider>
      <Screen />
    </GameStateStoreProvider>
  );
};

const Screen = () => {
  const { deck } = useDeckContainer();
  const flashcards = useGameStateStore()((s) => s.flashcards);

  if (!deck) return <div>Deck not found</div>;
  if (flashcards.length === 0) return <ScreenStart />;

  return <ScreenPlay />;
};
