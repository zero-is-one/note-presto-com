import { Link, RichTextEditor } from "@mantine/tiptap";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  InsertControlSheetMusicNote,
  SheetMusicNoteExtension,
} from "./SheetMusicNoteExtension";
import { InsertControlSvgEmbded, SvgEmbedExtension } from "./SvgEmbedExtension";

export const extensions = [
  StarterKit,
  Underline,
  Link,
  Superscript,
  SubScript,
  Highlight,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  SheetMusicNoteExtension,
  SvgEmbedExtension,
];

export const FlashcardTextEditor = ({
  placeholder,
  content,
  onChange,
  editable = true,
}: {
  placeholder?: string;
  content?: string;
  onChange?: (content: string) => void;
  editable?: boolean;
}) => {
  const editor = useEditor({
    editable,
    extensions: [Placeholder.configure({ placeholder }), ...extensions],
    content,
    onUpdate({ editor }) {
      if (!onChange) return;
      onChange(editor.getHTML());
    },
  });

  return (
    <RichTextEditor editor={editor}>
      {editable && (
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <InsertControlSheetMusicNote />
            <InsertControlSvgEmbded />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
      )}

      <RichTextEditor.Content />
    </RichTextEditor>
  );
};
