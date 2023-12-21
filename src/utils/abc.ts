import { Key } from "tonal";
import { Note } from "tonal";
import { AbcNotation } from "tonal";
import { NoteName } from "tonal";

// Likely a better way to do this, but this works for now
// TODO: Refactor
export function scientificToABCKeySignature(
  noteName: NoteName,
  key?: string,
  isMinor?: boolean,
  isMelodic?: boolean
): string {
  const keySignature = !isMinor
    ? Key.majorKey(key || "C")
    : Key.minorKey(key || "C")[isMelodic ? "melodic" : "natural"];

  if (keySignature.scale.length === 0) {
    console.error(`Invalid key signature '${key}'.`);
    new Error("Invalid key signature");
  }

  const note = Note.get(noteName);
  const scaleNote = Note.get(
    keySignature.scale.find((n) => Note.get(n).letter === note.letter)!
  );

  const abcNote = AbcNotation.scientificToAbcNotation(
    `${note.letter}${note.oct}`
  );

  let modifier = "";

  if (scaleNote.acc == note.acc) modifier = "";

  // Could make this shorter, but I think this is more readable
  if (scaleNote.acc == "#" && note.acc == "") modifier = "=";
  if (scaleNote.acc == "#" && note.acc == "b") modifier = "_";

  if (scaleNote.acc == "b" && note.acc == "") modifier = "=";
  if (scaleNote.acc == "b" && note.acc == "#") modifier = "^";

  if (scaleNote.acc == "" && note.acc == "b") modifier = "_";
  if (scaleNote.acc == "" && note.acc == "#") modifier = "^";

  return `${modifier}${abcNote}`;
}
