import { deleteBannerFile } from "@/utils/banners/banner-files.utils";
import { foundFileInStorage, getFilePath } from "@/utils/storage/storage.util";

/**
 * 
 * @returns 
 */

export async function DELETE(request: Request) {
    
    const { 
        image_url
    } = await request.json();

    const pathFile = getFilePath({fileUrl: image_url});

    if(!foundFileInStorage({pathFile})) return Response.json({
        status: 404,
        message: "Banner not found!"
    })

    const { data } = await deleteBannerFile(pathFile);

    if(data) return Response.json({ 
        status: 201,
        message: "Delete a banner successfully",
    })

    return Response.json({
        status: 405,
        message: "Error deleting banner!"
    })
}
