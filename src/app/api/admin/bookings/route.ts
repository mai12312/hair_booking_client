// import { createNewCategory, getAllCategories } from "@/utils/categories/categories.util";

// /**
//  * Create a new category
//  * @param request 
//  * @returns 
//  */
// export async function POST(request: Request) {
//     const {webtoon_tag_name} = await request.json();
//     const { data, error } = await createNewCategory(webtoon_tag_name);
//     if(error || !data) {
//         return Response.json({
//             status: 404,
//             message: "You can't create new category!",
//             data: null
//         })
//     }
//     return Response.json({
//         status: 201,
//         datas: data,
//         message: "Create new category successfully!"
//     })
// }

// /**
//  * Get all bookings
//  * @param request 
//  * @returns 
//  */
// export async function GET(request: Request) {
//     const {data, error} = await getAllBookings();
//     if(error || !data) {
//         return Response.json({
//             status: 400,
//             message: "You can't get all categories!",
//             datas: null,
//         })
//     }
//     return Response.json({
//         status: 201,
//         datas: data,
//         message: "Get all categories successfully!"
//     })
// }
