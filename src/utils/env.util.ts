
/**
 * Get url
 */
export const getURl = () => {
    const urlDev = process.env.NEXT_PUBLIC_DEV_URL;
    const urlProd = process.env.NEXT_PUBLIC_PROD_URL;
    const url = process.env.NEXT_PUBLIC_NODE_ENV == "development" ? urlDev : urlProd;
    return url;
}
// const getURL = (path: string = "") => {
//     let url =
//         process?.env?.NEXT_PUBLIC_PROD_URL &&
//             process.env.NEXT_PUBLIC_PROD_URL.trim() !== ""
//             ? process.env.NEXT_PUBLIC_PROD_URL
//             : "http://localhost:3000/";

//     url = url.replace(/\/+$/, "");
//     url = url.includes("http") ? url : `https://${url}`;
//     path = path.replace(/^\/+/, "");
//     return path ? `${url}/${path}` : url;
// };

export const getApiBackend = () => {
    const backendUrl = process.env.NEXT_PUBLIC_HAIR_BOOKING_API ?? "http://localhost:5000";
    return backendUrl;
}