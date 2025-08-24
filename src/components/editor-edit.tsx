
"use client";

import { EditorContent } from "@tiptap/react";

import "@/components/editor.css";
import { memo } from "react";
import { useGetEditorContent } from "@/hooks/editor/useGetEditorContent";
import { Button } from "./ui/button";
import { SendHorizontal } from "lucide-react";
import { useActionsComments } from "@/hooks/user/volumes/comments/useActionsComments";
import { CommentType } from "@/types/comment-type";

export const EditorEditComponent = memo(({ comment } : { comment:  CommentType.TCommentView}) => {
  const { editorEdit } = useGetEditorContent();
  const { editorMethods } = useActionsComments();

  return (
    <div className="flex ml-4 w-full">
        <EditorContent
          editor={editorEdit}
          spellCheck="false"
          autoComplete="true"
          className="custom-editor w-full whitespace-pre-wrap break-all"
        />
        <Button 
            className="-mr-1 rounded-3xl bg-gray-300 h-12 w-12 flex justify-center items-center ml-2"
            onClick={() => editorMethods.editComment(comment)}
        >
            <SendHorizontal/>
        </Button>
    </div>
  );
});

EditorEditComponent.displayName = "EditorEditComponent"