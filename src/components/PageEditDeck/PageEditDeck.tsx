import { useRoutes } from "react-router-dom";
import { DeckResource } from "../DeckResource/DeckResource";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { ViewFlashcard } from "./ViewFlashcard";
import { ViewFlashcards } from "./ViewFlashcards";
import { ViewGeneral } from "./ViewGeneral";

export const PageEditDeck = () => {
  return (
    <DeckResource>
      {useRoutes([
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
      ])}
    </DeckResource>
  );
};
