import { LayoutSimpleBar } from "@/components/LayoutSimpleBar/LayoutSimpleBar";
import { DeckContainer } from "@/hooks/useDeck";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { ActionIcon, Button, Group, Title, rem } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import {
  MdArrowBack,
  MdDragIndicator,
  MdEditNote,
  MdOutlinePostAdd,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export function ViewFlashcards() {
  const navigate = useNavigate();
  const { deck, save: saveDeck } = DeckContainer.useContainer();
  const [state, handlers] = useListState(deck.flashcards);

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id}>
      {(provided, snapshot) => (
        <Button.Group
          ref={provided.innerRef}
          {...provided.draggableProps}
          mb={6}
          style={getDragXAxisLockStyle({
            ...provided.draggableProps.style,
            ...snapshot,
          })}
        >
          <Button
            component={"div"}
            {...provided.dragHandleProps}
            variant={snapshot.isDragging ? "filled" : "light"}
          >
            <MdDragIndicator
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </Button>

          <Button
            component={Link}
            to={item.id}
            w={"100%"}
            variant="light"
            rightSection={<MdEditNote fullWidth size={14} />}
          >
            {item.noteName} -{item.id}{" "}
          </Button>
        </Button.Group>
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
      rightItem={
        <Button
          onClick={async () => {
            await saveDeck();
            navigate("/");
          }}
        >
          Save Deck
        </Button>
      }
    >
      <Group justify="space-between" align="flex-end" mb="sm">
        <Title size={"h2"}>Flashcards</Title>
        <Button
          onClick={() => {
            navigate("new");
          }}
          rightSection={<MdOutlinePostAdd />}
          size="sm"
        >
          Add Flashcard
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
      </DragDropContext>
    </LayoutSimpleBar>
  );
}

function getDragXAxisLockStyle(style) {
  if (style?.transform) {
    const axisLockY = `translate(0px, ${style.transform.split(",").pop()}`;
    return {
      ...style,
      transform: axisLockY,
    };
  }
  return style;
}
