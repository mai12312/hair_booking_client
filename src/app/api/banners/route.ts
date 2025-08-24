import { createNewBanner, getAllBanners, getBannerIdByImageUrl } from "@/utils/banners/banners.util";

/**
 * Create a new category
 * @param request 
 * @returns 
 */
export async function POST(request: Request) {
    const { 
        banner_name,
        image_url,
        target_url
    } = await request.json();
    
    if(image_url.length > 0) {
        const {data ,error} = await getBannerIdByImageUrl(image_url);
        if(data && data.id) return Response.json({
            status: 409,
            message: "You can't create new banners! Image URL is existing!"
        })
    }

    const { data, error } = await createNewBanner({ 
        banner_name,
        image_url,
        target_url
    });

    if(error || !data) {
        return Response.json({
            status: 401,
            message: "You can't create new banners!"
        })
    }

    return Response.json({
        status: 201,
        data
    })
}

/**
 * Get all categories
 * @param request 
 * @returns 
 */
export async function GET(request: Request) {
    const {data, error} = await getAllBanners();

    if(error || !data) {
        return Response.json({
            status: 401,
            message: "You can't get all banners!"
        })
    }

    return Response.json({
        status: 201,
        datas: data
    })
}
