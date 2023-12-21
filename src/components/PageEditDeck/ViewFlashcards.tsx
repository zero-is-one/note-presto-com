import { LayoutSimpleBar } from "@/components/LayoutSimpleBar/LayoutSimpleBar";
import { DeckContainer } from "@/hooks/useDeck";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { ActionIcon, Button, Group, Text, Title, rem } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { MdArrowBack, MdDragIndicator } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const data = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

export function ViewFlashcards() {
  const navigate = useNavigate();
  const {
    deck,
    update: updateDeck,
    getDefaultFlashcard,
  } = DeckContainer.useContainer();
  const [state, handlers] = useListState(deck.flashcards);

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id}>
      {(provided, snapshot) => (
        <Group
          bg={snapshot.isDragging ? "red" : "white"}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps}>
            <MdDragIndicator
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </div>
          <Text>{item.detectNoteName} - </Text>
          <Text>{item.id}</Text>
        </Group>
      )}
    </Draggable>
  ));

  return (
    <LayoutSimpleBar
      leftItem={
        <ActionIcon variant="subtle" size={32} onClick={() => navigate(-1)}>
          <MdArrowBack size={24} />
        </ActionIcon>
      }
    >
      <Group justify="space-between">
        <Title>Flashcards</Title>
        <Button
          onClick={() => {
            const newFlashcard = getDefaultFlashcard();
            updateDeck((prev) => ({
              ...prev,
              flashcards: [...prev.flashcards, newFlashcard],
            }));
            navigate(newFlashcard.id);
          }}
        >
          Add
        </Button>
      </Group>
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          handlers.reorder({ from: source.index, to: destination?.index || 0 })
        }
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>{" "}
    </LayoutSimpleBar>
  );
}
