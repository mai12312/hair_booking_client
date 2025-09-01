"use server"
import { getApiBackend } from "./env.util";
import { slugify } from "./slugify";

/**
 * @description type of parameters to get all comments
 * @property {number} limit - The maximum number of records to return
 * @property {string} orderBy - The maximum number of records to return
 * @property {boolean} order - The maximum number of records to return
 */
type GetQueryServices = {
    limit?: number;
    offset?: number;
    order?: 'asc' | 'desc';
    sortBy?: string;
}

/**
 * Get all services
 */
export const getAllServices = async ({
    limit = 10,
    offset = 0,
    order = 'asc',
    sortBy = 'created_at'
}: GetQueryServices): Promise<DataResponse<{services: ServiceList}>> => {
    const backendUrl = getApiBackend();
    const api = `${backendUrl}/api/services?limit=${limit}&offset=${offset}&order=${order}&sortBy=${sortBy}`;
    const res = await fetch(api, {
        cache: "no-cache",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    return await res.json();
}
