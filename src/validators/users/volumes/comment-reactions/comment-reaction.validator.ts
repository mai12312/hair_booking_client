

import { z } from "zod";

const CommentReactionSchema = z.object({
    id: z.string(),
    comment_id: z.string().min(16, { 
        message: "Must be 8 or more characters long" 
    }),
    user_id: z.string().min(16, { 
        message: "Must be 8 or more characters long" 
    }),
    reaction_id: z.string().min(16, { 
        message: "Must be 8 or more characters long" 
    }),
    created_at: z.string(),
    updated_at: z.string(),
    is_deleted: z.boolean()
})

const createCommentReaction = CommentReactionSchema.omit({
    id: true, 
    created_at: true, 
    updated_at: true,
    is_deleted: true
});

export async function validateCreateCommentReaction({
        reactionId,
        commentId,
        userId
    }: {
        reactionId: string,
        commentId: string,
        userId: string
    }
) {
    const validate = createCommentReaction.safeParse({
        reaction_id: reactionId,
        comment_id: commentId,
        user_id: userId
    });
    
    if(!validate.success) {
        return {
            status: "401",
            message: "Invalid input!"
        }
    }
    return {
        status: "201",
        message: "Valid input!"
    }
}