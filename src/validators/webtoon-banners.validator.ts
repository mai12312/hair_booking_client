

import { z } from "zod";

const WebtoonTagsSchema = z.object({
    id: z.string(),
    webtoon_tag_name: z.string(),
    created_at: z.string(),
    updated_at: z.string()
})

const createWebtoonTag = WebtoonTagsSchema.omit({id: true, created_at: true, updated_at: true});

export async function validateCreateCategories({name}: {name: string}) {
    const validate = createWebtoonTag.safeParse({
        webtoon_tag_name: name
    });
    if(!validate.success) {
        return {
            status: "401",
            message: "Name is invalid!"
        }
    }
}