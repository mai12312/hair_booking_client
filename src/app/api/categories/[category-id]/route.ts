import { deleteCategory, foundCategoryById, updateCategory } from "@/utils/categories/categories.util";

/**
 * get params
 * @param request
 * @returns
 */
function getParamsToRoute(request: Request): string {
    const url = new URL(request.url);
    // get param from url
    const indexStart = ("/api/categories/").length;
    return url.pathname.slice(indexStart);
}

/**
 * Delete a category
 * @param { Request } request 
 * @returns
 */
export async function DELETE(request: Request) {
    const id = getParamsToRoute(request);
    if(!foundCategoryById(id)) return Response.json({
        status: 404,
        message: "Category not found!"
    })

    const { data } = await deleteCategory(id);

    if(data["status"] == 204) return Response.json({ 
        status: 201,
        message: "Delete a category successfully",
    })

    return Response.json({ 
        status: 405,
        message: "Error deleting category!"
    })
}

/**
 * @desc Update category
 * @param { Request } request 
 * @returns { Promise<Response> }
 * @url /api/categories/:id
 * @method POST
 */
export async function POST(request: Request): Promise<Response> {
    const id = getParamsToRoute(request);

    if(!foundCategoryById(id)) return Response.json({
        status: 404,
        message: "Category not found!"
    })

    const { name } = await request.json();
    const { data, error } = await updateCategory(name, id);

    if(error) {
        return Response.json({
            status: 405,
            message: "Error updating category!"
        })
    }

    return Response.json({
        status: 201,
        data,
        message: "updated category successfully!"
    })
}
