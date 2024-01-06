import { PageNotFound } from "@/components/PageNotFound/PageNotFound";
import { DeckContainer } from "@/hooks/useDeck";
import { useParams, useRoutes } from "react-router-dom";
import { ViewFlashcard } from "./ViewFlashcard";
import { ViewFlashcards } from "./ViewFlashcards";
import { ViewGeneral } from "./ViewGeneral";

export const PageEditDeck = () => {
  const { deckId } = useParams();

  const element = useRoutes([
    {
      path: "/",
      element: <ViewGeneral />,
    },
    {
      path: `flashcards`,
      element: <ViewFlashcards />,
    },
    {
      path: `flashcards/:flashcardId`,
      element: <ViewFlashcard />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <DeckContainer.Provider
      initialState={deckId === "new" ? undefined : deckId}
    >
      <DeckGuard>{element}</DeckGuard>
    </DeckContainer.Provider>
  );
};

const DeckGuard = ({ children }: { children: React.ReactNode }) => {
  const { error, loading, deck } = DeckContainer.useContainer();

  if (error) return <div>Error: {error.message}</div>;
  if (loading) return <div>Loading...</div>;
  if (!deck) return <div>Deck not found</div>;

  return children;
};
