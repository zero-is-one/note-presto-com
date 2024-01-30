import { StoreContext } from "@/contexts/DeckContext";
import { firestore } from "@/firebase";
import { Deck, WithTimestamps } from "@/types";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useContext } from "react";

export const useDeckStoreContext = () => {
  return useContext(StoreContext);
};

export const useDeckContext = () => {
  return useDeckStoreContext();
};

export const generateNewFlashcardId = () => {
  return Math.random().toString(36).replace("0.", "");
};

export const generateNewFlashcard = () => {
  return {
    id: generateNewFlashcardId(),
    prompt: "",
    response: "",
    noteName: "A4",
  };
};

export const save = (deck: Deck) => {
  const decksCollection = collection(firestore, "decks");
  const updatedDeck: Deck | WithTimestamps = {
    ...deck,
    updatedAt: serverTimestamp(),
  };

  if (deck.id === undefined)
    return addDoc(decksCollection, {
      ...updatedDeck,
      createdAt: serverTimestamp(),
    });

  return setDoc(doc(decksCollection, deck.id), updatedDeck, {
    merge: true,
  });
};
