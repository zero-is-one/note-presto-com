import { accidentals, noteLetters, octaves } from "@/types";
import { Select, SimpleGrid } from "@mantine/core";
import { Note } from "tonal";

export const MusicNotePicker = ({
  noteName,
  onChange,
}: {
  noteName: string;
  onChange: (noteName: string) => void;
}) => {
  const note = Note.get(noteName);

  return (
    <SimpleGrid cols={3}>
      <Select
        label="Note"
        checkIconPosition="right"
        value={note.letter || "C"}
        data={noteLetters.map((l) => ({ value: l, label: l }))}
        onChange={(letter) => {
          onChange(`${!letter ? note.letter : letter}${note.acc}${note.oct}`);
        }}
      />

      <Select
        label="Accidentals"
        checkIconPosition="right"
        value={note.acc || ""}
        data={accidentals.map((acc) => ({
          value: acc.replace("natural", ""),
          label: acc
            .replace("#", "♯ (sharp)")
            .replace("b", "♭ (flat)")
            .replace("natural", "♮ (natural)"),
        }))}
        onChange={(acc) => {
          onChange(`${note.letter}${acc === null ? note.acc : acc}${note.oct}`);
        }}
      />

      <Select
        label="Octave"
        checkIconPosition="right"
        value={`${note?.oct}` || "4"}
        data={octaves.map((oct) => ({
          value: oct,
          label: oct,
        }))}
        onChange={(oct) => {
          onChange(`${note.letter}${note.acc}${oct === null ? note.oct : oct}`);
        }}
      />
    </SimpleGrid>
  );
};
