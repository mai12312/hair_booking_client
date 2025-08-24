"use client";

import { EditorContent } from "@tiptap/react";

import "@/components/editor.css";
import { memo } from "react";
import { useGetEditorContent } from "@/hooks/editor/useGetEditorContent";

export const EditorComponent = memo(() => {
  const { editor } = useGetEditorContent();
  return (
    <EditorContent
      editor={editor}
      spellCheck="false"
      autoComplete="true"
      className="custom-editor w-full whitespace-pre-wrap break-all"
    />
  );
});

EditorComponent.displayName = "EditorComponent"