
"use client";

import { EditorContent } from "@tiptap/react";

import "@/components/editor.css";
import { memo } from "react";
import { useGetEditorContent } from "@/hooks/editor/useGetEditorContent";
import { Button } from "./ui/button";
import { SendHorizontal } from "lucide-react";
import { useActionsComments } from "@/hooks/user/volumes/comments/useActionsComments";

export const EditorReplyComponent = memo(({commentParentId, commentId}: {commentParentId: string, commentId?: string}) => {
  const { editorReply } = useGetEditorContent();
  const { addCommentMethods } = useActionsComments();

  return (
    <div className="flex flex-row pt-1 md-10 ml-16 my-2">
        <EditorContent
          editor={editorReply}
          spellCheck="false"
          autoComplete="true"
          className="custom-editor w-full whitespace-pre-wrap break-all"
        />
        <Button 
            className="-mr-1 rounded-3xl bg-gray-300 h-8 w-8 sm:h-12 sm:w-12 flex justify-center items-center ml-2"
            onClick={() => addCommentMethods.addCommentReply(commentParentId, commentId)}
        >
            <SendHorizontal/>
        </Button>
    </div>
  );
});

EditorReplyComponent.displayName = "EditorReplyComponent"