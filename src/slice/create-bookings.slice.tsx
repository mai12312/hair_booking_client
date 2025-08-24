"use client"

import { BookingContext } from "@/types/bookings";
import { createContext, memo, useCallback, useEffect, useMemo, useState } from "react"

/**
 * @desc context of comments
 */
export const createBookingContext = createContext<BookingContext.TCreateBookingContext>({
    booking: {
        id: 0,
        status: "",
        startTime: "",
        date: "",
        customerEmail: "",
        customerPhone: "",
        customerName: "",
        serviceIds: [],
    },
    setBooking: () => {},
});


/**
 * @desc type of AuthContextProvider
 */
export const CreateBookingContextProvider = memo(({
    children,
} : {
    children: React.ReactNode,
}) => {

    const [booking, setBooking] = useState<Booking>({
        id: 0,
        status: "pending",
        startTime: "",
        date: "",
        customerEmail: "",
        customerPhone: "",
        customerName: "",
        serviceIds: [],
    });

    return (
        <createBookingContext.Provider value={{
           booking,
           setBooking
        }}>
            {children}  
        </createBookingContext.Provider>
    )
})

CreateBookingContextProvider.displayName = "CreateBookingContextProvider";