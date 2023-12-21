import { FlashcardTextEditor } from "@/components/FlashcardTextEditor/FlashcardTextEditor";
import { LayoutSimpleBar } from "@/components/LayoutSimpleBar/LayoutSimpleBar";
import { DeckContainer } from "@/hooks/useDeck";
import { ActionIcon } from "@mantine/core";
import { MdArrowBack } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

export const ViewFlashcard = () => {
  const navigate = useNavigate();
  const { update: updateDeck, deck } = DeckContainer.useContainer();
  const { flashcardId } = useParams();
  const flashcard = deck.flashcards.find((f) => f.id === flashcardId);

  if (!flashcard) return <LayoutSimpleBar>Flashcard not found</LayoutSimpleBar>;

  return (
    <LayoutSimpleBar
      leftItem={
        <ActionIcon variant="subtle" size={32} onClick={() => navigate(-1)}>
          <MdArrowBack size={24} />
        </ActionIcon>
      }
    >
      {flashcard.id}
      <FlashcardTextEditor />
    </LayoutSimpleBar>
  );
};
