import { JSONContent } from "@tiptap/react";
import { FieldValue, Timestamp } from "firebase/firestore";
import { NoteName } from "tonal";

export type Flashcard = {
  id: string;
  frontMarkupJson: JSONContent;
  backMarkupJson: JSONContent;
  detectNoteName: NoteName;
};

export type Deck = {
  name: string;
  description: string;
  flashcards: Flashcard[];
};

export type HydratedDeck = Deck & WithId & WithTimestamps;

export const clefs = ["treble", "bass", "alto", "tenor"] as const;
export type Clef = (typeof clefs)[number];

export const keySignatures = [
  ...["C", "G", "D", "A", "E", "B"],
  ...["F#", "C#", "F"],
  ...["Bb", "Eb", "Ab", "Db", "Gb", "Cb"],
] as const;

export type KeySignature = (typeof keySignatures)[number];
export type WithId = { id: string };
export type WithTimestamps = {
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
};
