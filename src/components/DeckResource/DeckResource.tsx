import { StoreProvider as DeckStoreProvider } from "@/contexts/DeckContext";
import { firestore } from "@/firebase";
import { Deck } from "@/types";
import { doc } from "firebase/firestore";
import { ReactNode } from "react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";

export const DeckResource = ({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) => {
  const { deckId } = useParams();
  if (id === undefined && deckId === undefined)
    throw new Error("Must provide id or deckId");

  id = id || deckId;

  const [deckData, loading, error] = useDocumentDataOnce(
    id ? doc(firestore, "decks", id) : null,
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!deckData) return <div>Deck not found</div>;

  return (
    <DeckStoreProvider deck={{ ...deckData, id } as Deck}>
      {children}
    </DeckStoreProvider>
  );
};
