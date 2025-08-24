import { getIdFromUrl } from "@/utils/banners/banner-files.utils";
import { checkExistsBannerImage, deleteBanner, foundBannerById, updateBanner } from "@/utils/banners/banners.util";

/**
 * Delete a category
 * @param { Request } request 
 * @returns
 */
export async function DELETE(request: Request) {
    const id = getIdFromUrl(request);
    
    if(!foundBannerById(id)) return Response.json({
        status: 404,
        message: "Banner not found!"
    })

    const { data } = await deleteBanner(id);

    if(data["status"] == 204) return Response.json({ 
        status: 201,
        message: "Delete a banner successfully",
    })

    return Response.json({ 
        status: 405,
        message: "Error deleting banner!"
    })
}

/**
 * @desc Update banner
 * @param { Request } request 
 * @returns { Promise<Response> }
 * @url /api/categories/:id
 * @method POST
 */
export async function POST(request: Request): Promise<Response> {
    const id = getIdFromUrl(request);

    /**
     * Check banner is already exists
     */
    if(!foundBannerById(id)) return Response.json({
        status: 404,
        message: "Banner not found!"
    })
    
    /**
     * Get data from request
     */
    const { 
        bannerName, targetUrl, imageUrl, isBannerShow
    } = await request.json();
    
    /**
     * Check banner image is exists in other banner
     */
    if(imageUrl.length > 0) {
        const isExists = await checkExistsBannerImage(imageUrl, id);
        if(isExists) {
            return Response.json({
                status: 409,
                message: "You can't create new banners! Image URL is existing!"
            })
        }
    }


    /**
     * Update banner
     */
    const { data, error } = await updateBanner({
        banner_name: bannerName, 
        target_url: targetUrl,
        image_url: imageUrl,
        is_show: isBannerShow,
        id
    });

    if(error) {
        return Response.json({
            status: 405,
            message: "Error updating banner!"
        })
    }

    return Response.json({
        status: 201,
        data,
        message: "updated banner successfully!"
    })
}
