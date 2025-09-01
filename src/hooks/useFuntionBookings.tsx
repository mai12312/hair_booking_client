"use client"

import { getApiBackend } from "@/utils/env.util";
import { EventInput } from "@fullcalendar/core/index.js";
import { useCallback } from "react";
import { useGetBookings } from "./useGetBookings";
/**
 * Custom hook to manage booking data.
 * @param bookings Array of booking objects.
 * @returns Object containing utility functions for booking data.
 */
export function useFunctionBookings(bookings: Array<Partial<Booking>>) {
    const { setBookings } = useGetBookings();
    /**
     * Maps booking data to FullCalendar event format.
     */
    const mapBookingToEvent = useCallback((bookings: Array<Partial<Booking>>): Array<EventInput> => {
        return bookings.map((booking) => {
            return {
                id: booking.id?.toString() || "",
                title: booking.code || "Untitled",
                start: booking.startTime ? new Date(booking.startTime) : undefined,
                end: booking.endTime ? new Date(booking.endTime) : undefined,
                allDay: false,
            };
        })
    }, [bookings]);

    /**
     * Fetch bookings from the backend API.
     */
    const fetchBookings = useCallback((startTime: Date, endTime: Date, accessToken: string) => {
        const backendUrl = getApiBackend();
        const api = `${backendUrl}/api/admin/bookings?startTime=${startTime}&endTime=${endTime}`;
        fetch(api, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken ?? ""}`
            }
        })
           .then(res => res.json())
           .then((data) => {
                if(data && data.status === 200) {
                    setBookings(data.datas?.bookings ?? []);
                }
            })
            .catch(err => {
                setBookings([]);
            });
    }, []);

    /**
     * Check for booking time conflict.
     */
    const checkConflictBooking = useCallback((startTime: string, bookings: Array<Partial<Booking>>): boolean => {
        const newStart = new Date(startTime);
        const conflict = bookings.some(existing => {
            if (!existing.startTime) return false;
            const existStart = new Date(existing.startTime);
            // Compare by time value (milliseconds)
            return existStart.getTime() === newStart.getTime();
        });
        return conflict;
    }, [bookings]);

    return { 
        mapBookingToEvent,
        fetchBookings,
        checkConflictBooking
    };
}