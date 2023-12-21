import { Editor } from "@tiptap/react";
import { ActionIcon, ButtonGroup, Wrap } from "@mantine/core";

import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaParagraph,
  FaListUl,
  FaListOl,
  FaMusic,
  FaAlignRight,
  FaAlignLeft,
  FaAlignCenter,
  FaHighlighter,
} from "react-icons/Fa";
import { PiFileSvg } from "react-icons/pi";
import { VscClearAll } from "react-icons/vsc";
import { ImRedo2, ImUndo2, ImClearFormatting } from "react-icons/im";
import { BsDashLg } from "react-icons/bs";
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4 } from "react-icons/lu";

export const MenuBar = ({ editor }: { editor: Editor }) => {
  const sharedButtonProps = {
    colorScheme: "teal",
    variant: "outline",
    size: "sm",
  };

  return (
    <Wrap mb={3} borderTopRadius={"0.5rem"}>
      <ButtonGroup {...sharedButtonProps}>
        <ActionIcon
          icon={<FaParagraph />}
          {...sharedButtonProps}
          aria-label="paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          variant={editor.isActive("paragraph") ? "solid" : "outline"}
        ></ActionIcon>
        <ActionIcon
          icon={<LuHeading1 />}
          aria-label="h1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          variant={
            editor.isActive("heading", { level: 1 }) ? "solid" : "outline"
          }
        ></ActionIcon>
        <ActionIcon
          icon={<LuHeading2 />}
          aria-label="h2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          variant={
            editor.isActive("heading", { level: 2 }) ? "solid" : "outline"
          }
        ></ActionIcon>
        <ActionIcon
          icon={<LuHeading3 />}
          aria-label="h3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          variant={
            editor.isActive("heading", { level: 3 }) ? "solid" : "outline"
          }
        ></ActionIcon>
        <ActionIcon
          icon={<LuHeading4 />}
          aria-label="h4"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          variant={
            editor.isActive("heading", { level: 4 }) ? "solid" : "outline"
          }
        ></ActionIcon>
      </ButtonGroup>
      <ButtonGroup isAttached {...sharedButtonProps}>
        <ActionIcon
          icon={<FaAlignLeft />}
          aria-label="Align Right"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          variant={editor.isActive({ textAlign: "left" }) ? "solid" : "outline"}
        />
        <ActionIcon>
          <ActionIcon
            icon={<FaAlignCenter />}
            aria-label="Align Right"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            variant={
              editor.isActive({ textAlign: "center" }) ? "solid" : "outline"
            }
          />
        </ActionIcon>
        <ActionIcon
          icon={<FaAlignRight />}
          aria-label="Align Right"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          variant={
            editor.isActive({ textAlign: "right" }) ? "solid" : "outline"
          }
        ></ActionIcon>
      </ButtonGroup>
      <ButtonGroup isAttached {...sharedButtonProps}>
        <ActionIcon
          icon={<FaBold />}
          aria-label="bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "solid" : "outline"}
        ></ActionIcon>
        <ActionIcon
          icon={<FaItalic />}
          aria-label="italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          variant={editor.isActive("italic") ? "solid" : "outline"}
        ></ActionIcon>
        <ActionIcon
          icon={<FaStrikethrough />}
          aria-label="strike"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          variant={editor.isActive("strike") ? "solid" : "outline"}
        ></ActionIcon>
        <ActionIcon
          icon={<FaHighlighter />}
          aria-label="highlight"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          disabled={!editor.can().chain().focus().toggleHighlight().run()}
          variant={editor.isActive("highlight") ? "solid" : "outline"}
        ></ActionIcon>
      </ButtonGroup>
      <ButtonGroup isAttached {...sharedButtonProps}>
        <ActionIcon
          icon={<FaMusic />}
          aria-label="bold"
          onClick={() => {
            editor?.chain().focus().setSingleNote().run();
          }}
        ></ActionIcon>

        <ActionIcon
          icon={<PiFileSvg />}
          colorScheme="teal"
          aria-label="bold"
          onClick={() => {
            editor?.chain().focus().setSvgEmbed().run();
          }}
          variant={"outline"}
        />
        <ActionIcon
          icon={<BsDashLg />}
          {...sharedButtonProps}
          aria-label="horizontal rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </ButtonGroup>
      <ButtonGroup isAttached {...sharedButtonProps}>
        <ActionIcon
          icon={<FaListUl />}
          colorScheme="teal"
          aria-label="bullet list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive("bulletList") ? "solid" : "outline"}
        />
        <ActionIcon
          icon={<FaListOl />}
          aria-label="ordered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive("orderedList") ? "solid" : "outline"}
        />
      </ButtonGroup>
      <ButtonGroup isAttached {...sharedButtonProps}>
        <ActionIcon
          icon={<ImUndo2 />}
          variant={"outline"}
          colorScheme="teal"
          aria-label="undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        />
        <ActionIcon
          icon={<ImRedo2 />}
          variant={"outline"}
          colorScheme="teal"
          aria-label="redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        />
      </ButtonGroup>
      <ActionIcon
        icon={<ImClearFormatting />}
        {...sharedButtonProps}
        aria-label="clear marks"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      />
      <ActionIcon
        icon={<VscClearAll />}
        {...sharedButtonProps}
        aria-label="clear nodes"
        onClick={() => editor.chain().focus().clearNodes().run()}
      />
    </Wrap>
  );
};
