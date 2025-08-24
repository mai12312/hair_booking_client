"use server"
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
 * Create a new service
 */
export const createNewService = async (service: {
    name: string,
    admin_id: number,
    category_id: number,
    status?: string,
    image?: string,
    duration?: number,
    price?: number,
    description?: string
}) => {
    const backendUrl = process.env.NEXT_PUBLIC_HAIR_BOOKING_API;
    const api = `${backendUrl}/api/services`;
    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...service,
            slug: slugify(service.name, { replacement: "-" })
        })
    })
}

/**
 * Update a service
 */
export const updateService = async (service: Partial<Service> & { id: string }) => {
   
}

/**
 * Delete a service
 */
export const deleteService = async (id: string) => {
   
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
    const backendUrl = process.env.NEXT_PUBLIC_HAIR_BOOKING_API;
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

/**
 * Find a service by ID
 */
export const findServiceById = async (id: string) => {
   
}