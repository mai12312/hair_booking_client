"use client"

import { createBookingContext } from "@/slice/create-bookings.slice";
import { useContext } from "react"

export const useCreateBooking = () => {
    return useContext(createBookingContext);
}