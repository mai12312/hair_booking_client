"use client"
import { CalendarBookings } from "@/components/admin/dashboard/bookings/calendar-bookings";

export default function BookingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Bookings</h1>
      <CalendarBookings />
    </div>
  );
}