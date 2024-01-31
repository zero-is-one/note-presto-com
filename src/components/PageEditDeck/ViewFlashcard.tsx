import { FlashcardTextEditor } from "@/components/FlashcardTextEditor/FlashcardTextEditor";
import { LayoutSimpleBar } from "@/components/LayoutSimpleBar/LayoutSimpleBar";
import { MusicNotePicker } from "@/components/MusicNotePicker/MusicNotePicker";
import {
  generateNewFlashcard,
  useDeckStoreContext,
} from "@/hooks/useDeckStoreContext";
import { ActionIcon, Button, Card, Divider, Text } from "@mantine/core";
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { Note } from "tonal";

export const ViewFlashcard = () => {
  const navigate = useNavigate();
  const deckStore = useDeckStoreContext();
  const deck = deckStore.getState();
  const { flashcardId } = useParams();
  const [flashcard, setFlashcard] = useState(
    flashcardId === "new"
      ? generateNewFlashcard()
      : deck?.flashcards.find((f) => f.id === flashcardId),
  );

  if (!flashcard) return <LayoutSimpleBar>Flashcard not found</LayoutSimpleBar>;

  return (
    <LayoutSimpleBar
      leftItem={
        <ActionIcon variant="subtle" size={32} onClick={() => navigate(-1)}>
          <MdArrowBack size={24} />
        </ActionIcon>
      }
      rightItem={
        <Button
          onClick={() => {
            if (!deck) return;

            if (flashcardId === "new") {
              deckStore.setState({
                flashcards: [...deck.flashcards, flashcard],
              });
              return navigate(-1);
            }

            deckStore.setState({
              flashcards: deck.flashcards.map((f) =>
                f.id === flashcard.id ? flashcard : f,
              ),
            });

            navigate(-1);
          }}
        >
          Update Card
        </Button>
      }
    >
      <Card withBorder mb={"sm"}>
        <Text size="sm" mb={"sm"} ta={"center"}>
          Hz: {(Note.get(flashcard.noteName)?.freq || 0).toFixed(2)}
        </Text>
        <MusicNotePicker
          onChange={(noteName) => {
            console.log(noteName);
            setFlashcard({ ...flashcard, noteName });
          }}
          noteName={flashcard.noteName}
        />
      </Card>

      <FlashcardTextEditor
        content={flashcard.prompt}
        onChange={(prompt) => {
          console.log(prompt);
          setFlashcard({ ...flashcard, prompt });
        }}
        placeholder="Front of card text. This will be viewed before answer is shown"
      />
      <Divider my={"sm"} opacity={0} />
      <FlashcardTextEditor
        content={flashcard.response}
        onChange={(response) => {
          setFlashcard({ ...flashcard, response });
        }}
        placeholder="Back of card text. This will be viewed when aswer is shown."
      />
      <Text size="xs" c="dimmed" mt={"md"} ta={"right"}>
        id: {flashcard.id}
      </Text>
    </LayoutSimpleBar>
  );
};
