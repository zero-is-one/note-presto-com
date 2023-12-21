import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { SingleNoteSheetMusicExtension } from "./extensions/SingleNoteSheetMusicExtension";
import { SvgEmbedExtension } from "./extensions/SvgEmbedExtension";
import { MenuBar } from "./MenuBar";
import { TipTapStylesContainer } from "./TipTapStylesContainer";

export const FlashcardMarkupEditor = ({
  onUpdate,
  content,
  editable = true,
}: {
  onUpdate?: (markupJson: JSONContent) => void;
  content?: JSONContent;
  editable?: boolean;
}) => {
  const extensions = [
    SvgEmbedExtension,
    SingleNoteSheetMusicExtension,
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Highlight,
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ];

  const editor = useEditor({
    editable,
    extensions,
    content,
    onUpdate: ({ editor: e }) => {
      if (!onUpdate) return;
      onUpdate(e.getJSON());
    },
  });

  if (!editor) return null;

  return (
    <TipTapStylesContainer>
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </TipTapStylesContainer>
  );
};
