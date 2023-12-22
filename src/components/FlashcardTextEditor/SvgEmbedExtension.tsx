import { ActionIcon, Box, Button, Group, Modal, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { Node, mergeAttributes } from "@tiptap/core";
import {
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { PiFileSvgDuotone } from "react-icons/pi";

const defaultMarkup =
  '<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" viewBox="21 18.5 158 135.5"><path d="M25,50 l150,0 0,100 -150,0 z" stroke-width="4" stroke="black" fill="rgb(128,224,255)" fill-opacity="1" ></path><path d="M25,50 L175,150 M25,150 L175,50" stroke-width="4" stroke="black" fill="black" ></path><g transform="translate(0,0)" stroke-width="4" stroke="black" fill="none" ><circle cx="100" cy="30" r="7.5" fill="black" ></circle><circle cx="70" cy="30" r="7.5" fill="black" ></circle><circle cx="130" cy="30" r="7.5" fill="black" ></circle></g></svg>';

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    svgEmbed: {
      insertSvgEmbed: (options: { markup: string }) => ReturnType;
    };
  }
}

export const InsertControlSvgEmbded = () => {
  const { editor } = useRichTextEditorContext();
  return (
    <RichTextEditor.Control
      onClick={() => editor?.commands.insertSvgEmbed({ markup: defaultMarkup })}
      aria-label="Insert SVG"
      title="Insert SVG"
    >
      <PiFileSvgDuotone />
    </RichTextEditor.Control>
  );
};

export const SvgEmbedExtension = Node.create({
  name: "svgEmbedExtension",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      markup: {
        default: defaultMarkup,
      },
    };
  },

  addCommands() {
    return {
      insertSvgEmbed:
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
        tag: "svg-embed",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["svg-embed", mergeAttributes(HTMLAttributes)];
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
  const { markup } = node.attrs;
  const isSelected = editor.isEditable && selected;

  return (
    <NodeViewWrapper className="svg-embed-wrapper">
      <Box
        style={{ outline: `${isSelected ? 3 : 0}px solid #3367D1` }}
        pos={"relative"}
      >
        <div draggable="true" data-drag-handle="">
          <img src={`data:image/svg+xml;utf8,${encodeURIComponent(markup)}`} />
        </div>
        {isSelected && (
          <ActionIcon
            variant={"outline"}
            m={6}
            left={0}
            top={0}
            aria-label="edit svg"
            pos={"absolute"}
            onClick={() => open()}
          >
            <MdOutlineEditNote />
          </ActionIcon>
        )}
      </Box>
      <EditSvgModal
        disclosure={disclosure}
        markup={markup}
        onSubmit={(markup) => {
          updateAttributes({
            markup,
          });
        }}
      />
    </NodeViewWrapper>
  );
};

const EditSvgModal = ({
  markup,
  disclosure,
  onSubmit,
}: {
  markup: string;
  disclosure: ReturnType<typeof useDisclosure>;
  onSubmit: (markup: string) => void;
}) => {
  const [opened, { close }] = disclosure;
  const [value, setValue] = useState(markup);
  const inputHeight = "calc(100vh - 150px)";

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Edit Svg"
      fullScreen
      radius={0}
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <Textarea
        autosize={false}
        h={inputHeight}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        styles={{
          input: {
            fontFamily: "monospace",
            height: inputHeight,
          },
        }}
      />

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
