import { PageNotFound } from "@/components/PageNotFound/PageNotFound";
import { firestore } from "@/firebase";
import { DeckContainer, getEmptyDeck } from "@/hooks/useDeck";
import { Deck } from "@/types";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useParams, useRoutes } from "react-router-dom";
import { ViewFlashcard } from "./ViewFlashcard";
import { ViewFlashcards } from "./ViewFlashcards";
import { ViewGeneral } from "./ViewGeneral";

export const PageEditDeck = () => {
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

  const [deck, setDeck] = useState<Deck | undefined>();
  const { deckId } = useParams();
  const [deckData, loading, error] = useDocumentDataOnce(
    deckId && deckId !== "new" ? doc(firestore, "decks", deckId) : null,
  );

  useEffect(() => {
    if (deckId !== "new") return; // not a new deck
    setDeck(getEmptyDeck());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!deckData || deck) return;
    setDeck(deckData as Deck);
  }, [deckData, deck]);

  if (error) return <div>Error: {error.message}</div>;
  if (loading) return <div>Loading...</div>;
  if (!deck) return <div>Deck not found</div>;

  return (
    <DeckContainer.Provider initialState={deck}>
      {element}
    </DeckContainer.Provider>
  );
};
