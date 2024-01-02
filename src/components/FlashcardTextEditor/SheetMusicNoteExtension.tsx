import { SheetMusicNote } from "@/components/SheetMusicNote/SheetMusicNote";
import { Clef, KeySignature, clefs, keySignatures } from "@/types";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  Select,
  SimpleGrid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { Node, mergeAttributes } from "@tiptap/core";
import {
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { useState } from "react";
import { MdOutlineEditNote, MdQueueMusic } from "react-icons/md";
import { MusicNotePicker } from "../MusicNotePicker/MusicNotePicker";

type SheetMusicNoteAttrs = {
  noteName: string;
  clef: Clef;
  keySignature: KeySignature;
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    sheetMusicNote: {
      insertSheetMusicNote: (options: SheetMusicNoteAttrs) => ReturnType;
    };
  }
}

export const InsertControlSheetMusicNote = () => {
  const { editor } = useRichTextEditorContext();
  return (
    <RichTextEditor.Control
      onClick={() =>
        editor?.commands.insertSheetMusicNote({
          noteName: "A4",
          clef: "treble",
          keySignature: "C",
        })
      }
      aria-label="Insert Sheet Music Note"
      title="Insert Sheet Music Note"
    >
      <MdQueueMusic />
    </RichTextEditor.Control>
  );
};

export const SheetMusicNoteExtension = Node.create({
  name: "sheetMusicNoteExtension",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      noteName: {
        default: "D5",
      },
      clef: {
        default: "treble",
      },
      keySignature: {
        default: "C",
      },
    };
  },

  addCommands() {
    return {
      insertSheetMusicNote:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  parseHTML() {
    return [
      {
        tag: "sheet-music-note",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["single-note", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(NodeRenderer);
  },
});

const NodeRenderer = ({
  selected,
  editor,
  updateAttributes,
  node,
}: NodeViewProps) => {
  const disclosure = useDisclosure(false);
  const [opened, { open }] = disclosure;
  const { noteName, clef, keySignature } = node.attrs;
  const isSelected = editor.isEditable && selected;

  return (
    <NodeViewWrapper>
      <Box
        style={{
          outline: `${isSelected ? 3 : 0}px solid #3367D1`,
        }}
        pos={"relative"}
      >
        <div draggable="true" data-drag-handle="">
          <SheetMusicNote
            noteName={noteName}
            clef={clef}
            keySignature={keySignature}
          />
        </div>
        {isSelected && (
          <ActionIcon
            variant={"outline"}
            m={6}
            top={0}
            left={0}
            aria-label="edit single note"
            pos={"absolute"}
            onClick={() => open()}
          >
            <MdOutlineEditNote />
          </ActionIcon>
        )}
      </Box>
      {opened && (
        <MusicNoteSettingsModal
          disclosure={disclosure}
          settings={node.attrs as SheetMusicNoteAttrs}
          onSubmit={(settings) => {
            updateAttributes({
              ...settings,
            });
          }}
        />
      )}
    </NodeViewWrapper>
  );
};

const MusicNoteSettingsModal = ({
  settings,
  disclosure,
  onSubmit,
}: {
  settings: SheetMusicNoteAttrs;
  disclosure: ReturnType<typeof useDisclosure>;
  onSubmit: (settings: SheetMusicNoteAttrs) => void;
}) => {
  const [value, setValue] = useState(settings);
  const [opened, { close }] = disclosure;

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Edit Music Note"
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <Box mb={"xs"}>
        <MusicNotePicker
          noteName={value.noteName}
          onChange={(noteName) => {
            setValue({
              ...value,
              noteName,
            });
          }}
        />
      </Box>

      <SimpleGrid cols={3}>
        <Select
          label="Key Signature"
          checkIconPosition="right"
          value={value.keySignature || "C"}
          data={keySignatures.map((ks) => ({ value: ks, label: ks }))}
          onChange={(keySignature) => {
            setValue({
              ...value,
              keySignature: keySignature as KeySignature,
            });
          }}
        />
        <Select
          label="Clef"
          checkIconPosition="right"
          value={value.clef || "treble"}
          data={clefs.map((clef) => ({
            value: clef,
            label: clef.charAt(0).toUpperCase() + clef.slice(1),
          }))}
          onChange={(clef) => {
            setValue({
              ...value,
              clef: clef as Clef,
            });
          }}
        />
      </SimpleGrid>

      <Group mt={"sm"} justify="space-between">
        <Button onClick={close}>Cancel</Button>{" "}
        <Button
          mr={3}
          onClick={() => {
            onSubmit(value);
            close();
          }}
        >
          Save
        </Button>
      </Group>
    </Modal>
  );
};
