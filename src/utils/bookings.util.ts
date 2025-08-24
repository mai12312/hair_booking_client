"use server"
import { slugify } from "./slugify";

/**
 * @description type of parameters to get all bookings
 * @property {number} limit - The maximum number of records to return
 * @property {string} orderBy - The maximum number of records to return
 * @property {boolean} order - The maximum number of records to return
 */
type GetQueryBookings = {
    limit?: number;
    offset?: number;
    order?: 'asc' | 'desc';
    sortBy?: string;
}
/**
 * Create a new booking
 */
export const createNewBookings = async (booking: {
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
    const api = `${backendUrl}/api/bookings`;
    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...booking,
            slug: slugify(booking.name, { replacement: "-" })
        })
    })
}

/**
 * Update a service
 */
export const updateBookings = async (service: Partial<Service> & { id: string }) => {
   
}

/**
 * Delete a service
 */
export const deleteCategory = async (id: string) => {
   
}

/**
 * Get all services
 */
export const getAllBookings = async ({
    limit = 10,
    offset = 0,
    order = 'asc',
    sortBy = 'created_at'
}: GetQueryBookings): Promise<DataResponse<{categories: CategoryList}>> => {
    const backendUrl = process.env.NEXT_PUBLIC_HAIR_BOOKING_API;
    const api = `${backendUrl}/api/service-categories?limit=${limit}&offset=${offset}&order=${order}&sortBy=${sortBy}`;
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