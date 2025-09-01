"use client"

import { createContext, memo, useState } from "react";

/**
 * pending is use when fetching first time
 */
type TBookingContext = {
    bookings: BookingList,
    setBookings: React.Dispatch<React.SetStateAction<BookingList>>,
    isShowEditDialog: boolean,
    setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>,
    month: number,
    setMonth: React.Dispatch<React.SetStateAction<number>>,
    year: number,
    setYear: React.Dispatch<React.SetStateAction<number>>,
    startTime: string,
    setStartTime: React.Dispatch<React.SetStateAction<string>>,
    endTime: string,
    setEndTime: React.Dispatch<React.SetStateAction<string>>,
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
    startTime: '',
    setStartTime: () => {},
    endTime: '',
    setEndTime: () => {}
});

export const BookingsProvider = memo(function BookingsProvider({children}: {children: React.ReactNode}) {
    const [bookings, setBookings] = useState<BookingList>([]);
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
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
