import { AbcRenderer } from "@/components/AbcRenderer/AbcRenderer";
import { KeySignature } from "@/types";
import { scientificToABCKeySignature } from "@/utils/abc";
import { Key, Note, NoteName } from "tonal";

export const SheetMusicNote = ({
  noteName,
  clef,
  keySignature,
  isMinor,
  isMelodic,
}: {
  noteName: NoteName;
  clef?: "treble" | "bass" | "alto" | "tenor";
  keySignature?: KeySignature;
  isMinor?: boolean;
  isMelodic?: boolean;
}) => {
  const isValidNoteObj = Note.get(noteName).empty === false;

  const abcNote = isValidNoteObj
    ? scientificToABCKeySignature(noteName, keySignature, isMinor, isMelodic)
    : noteName;

  const keyObj = !isMinor
    ? Key.majorKey(keySignature || "C")
    : Key.minorKey(keySignature || "C");

  const alteration = Math.abs(keyObj.alteration);
  const staffwidth = 90 + (alteration - 1) * 10;

  const notation = `X: 1
L:1/4
K:${keySignature || "C"} clef=${clef || "treble"}
${abcNote}
`;

  return (
    <AbcRenderer
      abc={notation}
      params={{
        selectTypes: [],
        scale: 1,
        staffwidth,
        responsive: "resize",
        paddingtop: -3,
        paddingbottom: 3,
        paddingright: 3,
        paddingleft: 3,
      }}
    />
  );
};
