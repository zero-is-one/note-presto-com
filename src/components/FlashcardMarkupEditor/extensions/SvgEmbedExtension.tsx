import { useState } from "react";
import { IconButton, Box, useDisclosure, Textarea } from "@mantine/core";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@mantine/core";
import { mergeAttributes, Node } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewProps,
} from "@tiptap/react";
import { FaEdit } from "react-icons/Fa";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    svgEmbed: {
      setSvgEmbed: (options: { markup: string }) => ReturnType;
    };
  }
}

export const SvgEmbedExtension = Node.create({
  name: "svgEmbedExtension",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      markup: {
        default:
          '<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" viewBox="21 18.5 158 135.5"><path d="M25,50 l150,0 0,100 -150,0 z" stroke-width="4" stroke="black" fill="rgb(128,224,255)" fill-opacity="1" ></path><path d="M25,50 L175,150 M25,150 L175,50" stroke-width="4" stroke="black" fill="black" ></path><g transform="translate(0,0)" stroke-width="4" stroke="black" fill="none" ><circle cx="100" cy="30" r="7.5" fill="black" ></circle><circle cx="70" cy="30" r="7.5" fill="black" ></circle><circle cx="130" cy="30" r="7.5" fill="black" ></circle></g></svg>',
      },
    };
  },

  addCommands() {
    return {
      setSvgEmbed:
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
  const disclosure = useDisclosure();
  const { markup } = node.attrs;
  const isSelected = editor.isEditable && selected;

  return (
    <NodeViewWrapper className="svg-embed-wrapper">
      <Box
        style={{ outline: `${isSelected ? 3 : 0}px solid #3367D1` }}
        position={"relative"}
      >
        {isSelected && (
          <IconButton
            variant={"outline"}
            m={1}
            right={0}
            icon={<FaEdit />}
            aria-label="edit svg"
            position={"absolute"}
            onClick={() => disclosure.onOpen()}
          />
        )}

        <div draggable="true" data-drag-handle="">
          <img src={`data:image/svg+xml;utf8,${encodeURIComponent(markup)}`} />
          <EditSvgModal
            disclosure={disclosure}
            markup={markup}
            onSubmit={(markup) => {
              updateAttributes({
                markup,
              });
            }}
          />
        </div>
      </Box>
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
  const { isOpen, onClose } = disclosure;
  const [value, setValue] = useState(markup);

  return (
    <Modal
      size={"full"}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit your SVG</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Textarea
            height={"calc(100vh - 200px)"}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              onSubmit(value);
              onClose();
            }}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
