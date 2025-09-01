"use client"

import { BookingsContext } from "@/slice/bookings.slice"
import { useContext } from "react"

export function useGetBookings() {
    return useContext(BookingsContext)
}