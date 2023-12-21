import { mergeAttributes, Node } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewProps,
} from "@tiptap/react";
import { NoteSelectors } from "@/components/NoteSelectors/NoteSelectors";
import { SingleNoteSheetMusic } from "@/components/SingleNoteSheetMusic/SingleNoteSheetMusic.js";
import { Flex, Box, Select, HStack } from "@mantine/core";
import { Clef, clefs, KeySignature, keySignatures } from "@/types";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    singleNote: {
      setSingleNote: (options: {
        noteName: string;
        clef: Clef;
        keySignature: KeySignature;
      }) => ReturnType;
    };
  }
}

export const SingleNoteSheetMusicExtension = Node.create({
  name: "singleNoteSheetMusicExtension",
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
      setSingleNote:
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
        tag: "single-note",
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
    <NodeViewWrapper className="single-note-wrapper">
      <Box
        style={{
          outline: `${isSelected ? 3 : 0}px solid #3367D1`,
        }}
        position={"relative"}
      >
        {isSelected && (
          <HStack
            position={"absolute"}
            zIndex={5}
            display={"flex"}
            left={0}
            top={0}
            p={1}
          >
            <Select
              size="md"
              value={clef || "treble"}
              onChange={(e) => {
                updateAttributes({
                  clef: e.target.value,
                });
              }}
            >
              {clefs.map((clef) => (
                <option key={clef} value={clef}>
                  {clef} clef
                </option>
              ))}
            </Select>
            <Select
              size="md"
              value={keySignature || "C"}
              onChange={(e) => {
                updateAttributes({
                  keySignature: e.target.value,
                });
              }}
            >
              {keySignatures.map((ks) => (
                <option key={ks} value={ks}>
                  {ks} Key
                </option>
              ))}
            </Select>
            <NoteSelectors
              onChange={(noteName) => {
                updateAttributes({
                  noteName,
                });
              }}
              noteName={noteName}
            />
          </HStack>
        )}
        <div draggable="true" data-drag-handle="">
          <SingleNoteSheetMusic
            noteName={noteName}
            clef={clef}
            keySignature={keySignature}
          />
        </div>
      </Box>
    </NodeViewWrapper>
  );
};
