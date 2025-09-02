"use client"

import { createContext, memo, useState } from "react";

/**
 * pending is use when fetching first time
 */
type TBookingContext = {
    bookings: BookingList,
    setBookings: React.Dispatch<React.SetStateAction<BookingList>>,
    isShowEditDialog: boolean,
    pending: boolean,
    setPending: React.Dispatch<React.SetStateAction<boolean>>,
    setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>,
    month: number,
    setMonth: React.Dispatch<React.SetStateAction<number>>,
    year: number,
    setYear: React.Dispatch<React.SetStateAction<number>>,
    startTime: Date,
    setStartTime: React.Dispatch<React.SetStateAction<Date>>,
    endTime: Date,
    setEndTime: React.Dispatch<React.SetStateAction<Date>>,
}

export const BookingsContext = createContext<TBookingContext>({
    bookings: [],
    setBookings: () => {},
    isShowEditDialog: false,
    month: new Date().getMonth() + 1,
    setMonth: () => {},
    year: new Date().getFullYear(),
    setYear: () => {},
    setShowEditDialog: () => {},
    startTime: new Date(),
    setStartTime: () => {},
    endTime: new Date(),
    setEndTime: () => {},
    pending: false,
    setPending: () => {}
});

export const BookingsProvider = memo(function BookingsProvider({children}: {children: React.ReactNode}) {
    const [bookings, setBookings] = useState<BookingList>([]);
    const [pending, setPending] = useState<boolean>(false);
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<Date>(new Date());
    const [isShowEditDialog, setShowEditDialog] = useState<boolean>(false);

    return (
        <BookingsContext.Provider value={{
            bookings,
            setBookings,
            isShowEditDialog,
            setShowEditDialog,
            month,
            setMonth,
            year,
            setYear,
            pending,
            setPending,
            startTime,
            setStartTime,
            endTime,
            setEndTime
        }}>
            {children}
        </BookingsContext.Provider>
    )
})
BookingsProvider.displayName = "BookingsProvider";
