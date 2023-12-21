import { SheetMusicNote } from "@/components/SheetMusicNote/SheetMusicNote";
import { Clef, KeySignature, keySignatures } from "@/types";
import { Box, Group, Select } from "@mantine/core";
import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { IconStar } from "@tabler/icons-react";
import { Node, mergeAttributes } from "@tiptap/core";
import {
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    sheetMusicNote: {
      insertSheetMusicNote: (options: {
        noteName: string;
        clef: Clef;
        keySignature: KeySignature;
      }) => ReturnType;
    };
  }
}

export const InsertMusicNoteControl = () => {
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
      <IconStar stroke={1.5} size="1rem" />
    </RichTextEditor.Control>
  );
};

export const sheetMusicNoteExtension = Node.create({
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
        {isSelected && (
          <Group
            pos={"absolute"}
            style={{ zIndex: 1 }}
            display={"flex"}
            left={0}
            top={0}
            p={1}
          >
            {/* <Select
              size="md"
              value={clef || "treble"}
              onChange={(value) => {
                updateAttributes({
                  clef: value,
                });
              }}
            >
              {clefs.map((clef) => (
                <option key={clef} value={clef}>
                  {clef} clef
                </option>
              ))}
            </Select> */}
            <Select
              style={{ maxWidth: 84 }}
              checkIconPosition="right"
              value={keySignature || "C"}
              data={keySignatures.map((ks) => ({ value: ks, label: ks }))}
              onChange={(value) => {
                updateAttributes({
                  keySignature: value,
                });
              }}
            />
            {/* <NoteSelectors
              onChange={(noteName) => {
                updateAttributes({
                  noteName,
                });
              }}
              noteName={noteName}
            /> */}
          </Group>
        )}
        <div draggable="true" data-drag-handle="">
          <SheetMusicNote
            noteName={noteName}
            clef={clef}
            keySignature={keySignature}
          />
        </div>
      </Box>
    </NodeViewWrapper>
  );
};
