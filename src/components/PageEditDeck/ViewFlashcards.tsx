import { extensions } from "@/components/FlashcardTextEditor/FlashcardTextEditor";
import { LayoutSimpleBar } from "@/components/LayoutSimpleBar/LayoutSimpleBar";
import { cloneFlashcard, useDeckContainer } from "@/hooks/useDeck";
import { Flashcard } from "@/types";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Text,
  Title,
  rem,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { generateJSON } from "@tiptap/html";
import { useState } from "react";
import { FaCheck, FaClone } from "react-icons/fa";
import { MdArrowBack, MdDragIndicator, MdOutlinePostAdd } from "react-icons/md";
import { RiDeleteBin2Fill, RiListSettingsFill } from "react-icons/ri";

import { Link, useNavigate } from "react-router-dom";

export function ViewFlashcards() {
  const navigate = useNavigate();
  const { deck, save: saveDeck } = useDeckContainer();
  const [state, handlers] = useListState(deck?.flashcards);
  const [isEditMode, setIsEditMode] = useState(false);

  const openDeleteModal = ({ flashcard }: { flashcard: Flashcard }) =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this card?",
      size: "sm",
      radius: "md",
      centered: true,
      withCloseButton: false,
      children: (
        <Text size="sm">
          Deleting this flashcard will remove it from the deck. This action
          cannot be undone.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      //onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        const index = state.findIndex((f) => f.id === flashcard.id);
        if (index === undefined) return;
        handlers.remove(index);
      },
    });

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
        <Group>
          <Title size={"h2"}>Flashcards</Title>
          <Badge color="blue">{deck?.flashcards.length} cards</Badge>
        </Group>
        <Group>
          {!isEditMode && (
            <>
              <Button
                onClick={() => {
                  navigate("new");
                }}
                leftSection={<MdOutlinePostAdd />}
                size="sm"
              >
                Add Flashcard
              </Button>{" "}
              <ActionIcon
                variant="filled"
                aria-label="Settings"
                size={"lg"}
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                <RiListSettingsFill
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </>
          )}

          {isEditMode && (
            <Button
              color="green"
              onClick={() => {
                setIsEditMode(false);
              }}
              leftSection={<FaCheck />}
              size="sm"
            >
              Done
            </Button>
          )}
        </Group>
      </Group>
      {!isEditMode && (
        <>
          {state.map((item) => (
            <Button.Group mb={6} key={item.id}>
              <Button w={"100%"} variant="light" component={Link} to={item.id}>
                {item.noteName} - {simplify(item.prompt)} -{" "}
                {simplify(item.response)}
              </Button>
            </Button.Group>
          ))}
        </>
      )}
      {isEditMode && (
        <DragDropContext
          onDragEnd={({ destination, source }) =>
            handlers.reorder({
              from: source.index,
              to: destination?.index || 0,
            })
          }
        >
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {state.map((item, index) => (
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

                        <Button w={"100%"} variant="light">
                          {item.noteName} - {simplify(item.prompt)} -{" "}
                          {simplify(item.response)}
                        </Button>

                        <Button
                          color={"blue"}
                          onClick={() => {
                            handlers.insert(index + 1, cloneFlashcard(item));
                          }}
                        >
                          <FaClone size={"1.5rem"} />
                        </Button>
                        <Button
                          color={"red"}
                          onClick={() => {
                            openDeleteModal({ flashcard: item });
                          }}
                        >
                          <RiDeleteBin2Fill size={"1.5rem"} />
                        </Button>
                      </Button.Group>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
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

type Node = {
  type: string;
  content: Node[];
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attrs: Record<string, any>;
};
function simplify(markdown: string) {
  const json = generateJSON(markdown, extensions) as Node;
  let result = "";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recurse = (node: Node) => {
    if (node.type === "text") result += node.text;

    if (node.type === "sheetMusicNoteExtension")
      result += `♫ ${node.attrs.noteName}${
        node.attrs.clef !== "treble" ? " " + node.attrs.clef : ""
      }`;

    if (node.type === "svgEmbedExtension") result += `{SVG}`;

    if (node.content) node.content.forEach(recurse);
  };

  recurse(json);

  return "[" + result + "]";
}
