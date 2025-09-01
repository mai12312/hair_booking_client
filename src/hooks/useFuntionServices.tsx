"use client"

/**
 * Custom hook to manage booking data.
 * @param bookings Array of booking objects.
 * @returns Object containing utility functions for booking data.
 */
export function useFunctionServices() {
    function calculateTotalPrice(services: ServiceList, selectedServiceIds: Array<number> | []): number {
        return selectedServiceIds.reduce((sum: number, id) => {
            const service = services.find((s) => s.id === id);
            return sum + (service?.price || 0);
        }, 0);
    }
    function calculateTotalDuration(services: ServiceList, selectedServiceIds: number[]): number {
        return selectedServiceIds.reduce((sum: number, id) => {
            const service = services.find((s) => s.id === id);
            return sum + (service?.duration || 0);
        }, 0)
    }
    return {
        calculateTotalPrice,
        calculateTotalDuration
    }
}