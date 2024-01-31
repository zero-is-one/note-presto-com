import { useCountdown } from "@/hooks/useCountdown";
import { useDetectMicrophoneNote } from "@/hooks/useDetectMicrophoneNote";
import { useFlashcardStats } from "@/hooks/useFlashcardStats";
import {
  useActiveFlashcard,
  useGameStateContextActions,
} from "@/hooks/useGameStateContext";
import {
  Box,
  Container,
  Group,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { BiSolidBinoculars } from "react-icons/bi";
import { IoMdMusicalNotes } from "react-icons/io";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { TbCardsFilled } from "react-icons/tb";

import { Note } from "tonal";
import { FlashcardTextEditor } from "../FlashcardTextEditor/FlashcardTextEditor";

export const ScreenPlay = () => {
  const flashcard = useActiveFlashcard();
  return <Flashcard key={flashcard.id} />;
};

export const Flashcard = () => {
  const { percentComplete, isComplete: isCountdownComplete } = useCountdown({
    durationMs: 3000,
    steps: 3,
  });
  const flashcard = useActiveFlashcard();
  const { promote, demote } = useGameStateContextActions();
  const { attemptCount, touchedCount, flashcardsCount } = useFlashcardStats();
  const [detectedNote, setDetectedNote] = useState<null | string>(null);
  useDetectMicrophoneNote(({ noteName }: { noteName: null | string }) => {
    if (detectedNote === noteName) return;
    setDetectedNote(noteName);

    if (noteName === null) return;
    if (Note.midi(noteName) !== Note.midi(flashcard.noteName)) return;

    if (!isCountdownComplete) return promote();
    demote();
  });

  return (
    <Container>
      <Stack
        w={"100%"}
        mih={"100dvh"}
        align="center"
        justify="center"
        pos="relative"
      >
        <Box w={"100%"}>
          <FlashcardTextEditor content={flashcard.prompt} editable={false} />
        </Box>
        {isCountdownComplete && (
          <>
            <Group>
              <IoMdMusicalNotes size={40} />
              <Title>{flashcard.noteName}</Title>
            </Group>
            <Box w={"100%"}>
              <FlashcardTextEditor
                content={flashcard.response}
                editable={false}
              />
            </Box>
          </>
        )}

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
          <PiMicrophoneStageFill size={22} />
          <Text style={{ verticalAlign: "middle" }}>
            {detectedNote || "---"}
          </Text>
        </Group>

        <Progress
          radius={0}
          value={Math.round(percentComplete * 100)}
          pos={"absolute"}
          bottom={0}
          w={"100%"}
        />
      </Stack>
    </Container>
  );
};
