import { firestore } from "@/firebase";
import { Deck, Flashcard, WithTimestamps } from "@/types";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createContainer } from "unstated-next";

export const getEmptyDeck = (): Deck => {
  return {
    name: "",
    description: "",
    flashcards: [],
  };
};

function useDeck(initialState: Deck) {
  const { deckId } = useParams();

  const [deck, update] = useState<Deck>({
    ...initialState,
  });
  const getDefaultFlashcard = () => {
    return {
      id: Math.random().toString(36).replace("0.", ""),
      prompt: "",
      response: "",
      noteName: "A4",
    } satisfies Flashcard;
  };

  const save = (id?: string) => {
    if (!id) {
      id = deckId;
    }

    const decksCollection = collection(firestore, "decks");

    const updatedDeck: Deck | WithTimestamps = {
      ...deck,
      updatedAt: serverTimestamp(),
    };

    if (deck.createdAt === undefined)
      return addDoc(decksCollection, {
        ...updatedDeck,
        createdAt: serverTimestamp(),
      });

    return setDoc(doc(decksCollection, id as string), updatedDeck, {
      merge: true,
    });
  };

  return {
    getDefaultFlashcard,
    deck,
    update,
    save,
  };
}

// @ts-expect-error -- See https://github.com/jamiebuilds/unstated-next/issues/45
export const DeckContainer = createContainer(useDeck);
