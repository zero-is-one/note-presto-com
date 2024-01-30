import { firestore } from "@/firebase";
import { Deck, Flashcard, WithTimestamps } from "@/types";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { createContainer } from "unstated-next";

export const getEmptyDeck = (): Deck => {
  return {
    name: "",
    description: "",
    flashcards: [],
  };
};

const getDefaultFlashcard = () => {
  return {
    id: Math.random().toString(36).replace("0.", ""),
    prompt: "",
    response: "",
    noteName: "A4",
  } satisfies Flashcard;
};

export const cloneFlashcard = (flashcard: Flashcard) => {
  const id = getDefaultFlashcard().id;
  return { ...flashcard, id } satisfies Flashcard;
};

function useDeck(initialState?: string) {
  const deckId = initialState;
  const [deck, setDeck] = useState<Deck | undefined>();
  const [deckData, loading, error] = useDocumentDataOnce(
    deckId ? doc(firestore, "decks", deckId) : null,
  );

  useEffect(() => {
    if (deckId) return; // not a new deck
    setDeck(getEmptyDeck());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!deckData) return;
    if (deck) return;
    setDeck(deckData as Deck);
  }, [deckData, deck]);

  const save = () => {
    if (!deck) return;
    const decksCollection = collection(firestore, "decks");

    const updatedDeck: Deck | WithTimestamps = {
      ...deck,
      updatedAt: serverTimestamp(),
    };

    if (!deckId)
      return addDoc(decksCollection, {
        ...updatedDeck,
        createdAt: serverTimestamp(),
      });

    return setDoc(doc(decksCollection, deckId), updatedDeck, {
      merge: true,
    });
  };

  return {
    loading,
    error,
    getDefaultFlashcard,
    deck,
    update: setDeck,
    save,
    cloneFlashcard,
  };
}

export const DeckContainer = createContainer(useDeck);
export const useDeckContainer = DeckContainer.useContainer;
