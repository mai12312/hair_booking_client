"use client"
import { CalendarBookings } from "@/components/admin/dashboard/bookings/calendar-bookings";
import { useGetBookings } from "@/hooks/useGetBookings";
import { getApiBackend } from "@/utils/env.util";

export default function BookingsPage() {
  const {startTime, endTime} = useGetBookings();
  const handleExport = () => {
    window.open(`${getApiBackend()}/api/admin/bookings/export?startTime=${startTime}&endTime=${endTime}`, "_blank");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Calendar Booking</h1>
      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded font-semibold"
        onClick={handleExport}
      >
        Export Excel/CSV
      </button>
      <CalendarBookings />
    </div>
  );
}