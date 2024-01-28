import { useCountdown } from "@/hooks/useCountdown";
import { useDetectMicrophoneNote } from "@/hooks/useDetectMicrophoneNote";
import { useFlashcardStats } from "@/hooks/useFlashcardStats";
import { useGameStateFlashcard } from "@/hooks/useGameStateFlashcard";
import { Container, Group, Progress, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { BiSolidBinoculars } from "react-icons/bi";
import { IoMdMusicalNotes } from "react-icons/io";
import { TbCardsFilled } from "react-icons/tb";

import { Note } from "tonal";
import { FlashcardTextEditor } from "../FlashcardTextEditor/FlashcardTextEditor";

export const ScreenPlay = () => {
  const { flashcard } = useGameStateFlashcard();
  return <Flashcard key={flashcard.id} />;
};

export const Flashcard = () => {
  const { percentComplete, isComplete: isCountdownComplete } = useCountdown({
    durationMs: 3000,
    steps: 3,
  });
  const { flashcard, promoteFlashcard, demoteFlashcard } =
    useGameStateFlashcard();
  const { attemptCount, touchedCount, flashcardsCount } = useFlashcardStats();
  const [detectedNote, setDetectedNote] = useState<null | string>(null);
  useDetectMicrophoneNote(({ noteName }: { noteName: null | string }) => {
    if (detectedNote === noteName) return;
    setDetectedNote(noteName);

    if (noteName === null) return;
    if (Note.midi(noteName) !== Note.midi(flashcard.noteName)) return;

    if (!isCountdownComplete) return promoteFlashcard();
    demoteFlashcard();
  });

  return (
    <Stack mih={"100dvh"} align="center" justify="center" pos="relative">
      <Container>
        <Stack align="center">
          <FlashcardTextEditor content={flashcard.prompt} editable={false} />
          {isCountdownComplete && (
            <FlashcardTextEditor
              content={flashcard.response}
              editable={false}
            />
          )}
        </Stack>
      </Container>

      <Group align="center" p={"sm"} pos={"absolute"} bottom={0} left={0}>
        <BiSolidBinoculars size={22} />
        <Text style={{ verticalAlign: "middle" }}>{attemptCount}</Text>
      </Group>

      <Group
        align="center"
        p={"sm"}
        pos={"absolute"}
        bottom={0}
        left={"50%"}
        style={{ transform: "translate(-50%, 0)" }}
      >
        <TbCardsFilled size={22} />
        <Text style={{ verticalAlign: "middle" }}>
          {touchedCount} / {flashcardsCount}
        </Text>
      </Group>

      <Group align="center" p={"sm"} pos={"absolute"} bottom={0} right={0}>
        <IoMdMusicalNotes size={22} />
        <Text style={{ verticalAlign: "middle" }}>{detectedNote || "---"}</Text>
      </Group>

      <Progress
        radius={0}
        value={Math.round(percentComplete * 100)}
        pos={"absolute"}
        bottom={0}
        w={"100%"}
      />
    </Stack>
  );
};