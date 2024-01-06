import { FieldValue, Timestamp } from "firebase/firestore";
import { NoteName } from "tonal";

export type Flashcard = {
  id: string;
  prompt: string;
  response: string;
  noteName: NoteName;
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

export const noteLetters = ["C", "D", "E", "F", "G", "A", "B"] as const;
export type NoteLetters = (typeof noteLetters)[number];

export const octaves = ["1", "2", "3", "4", "5", "6", "7"] as const;
export type Octave = (typeof octaves)[number];

export const accidentals = ["natural", "#", "b"] as const;
export type Accidental = (typeof accidentals)[number];
