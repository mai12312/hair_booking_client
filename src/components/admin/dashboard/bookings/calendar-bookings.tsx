"use client";

import React, { useEffect, useState } from "react";
import {
  DateSelectArg,
  EventClickArg,
  EventInput,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DialogAddBookings } from "./dialog-add-bookings";
import { useGetBookings } from "@/hooks/useGetBookings";
import { useFunctionBookings } from "@/hooks/useFuntionBookings";
import { useAuthAdmin } from "@/hooks/useAuthAdmin";
import { DialogEditBookingAdmin } from "./dialog-edit-booking";

export const CalendarBookings: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const { bookings, setShowEditDialog, setEndTime, setStartTime } = useGetBookings();
  const { mapBookingToEvent, fetchBookings } = useFunctionBookings(bookings);
  const [currentEvents, setCurrentEvents] = useState<Array<EventInput>>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking>({
    id: 0,
    customerName: "",
    startTime: "",
    endTime: "",
    status: "",
    customerEmail: "",
    customerPhone: "",
  });
  const { auth } = useAuthAdmin();
  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };
  useEffect(() => {
    setCurrentEvents(mapBookingToEvent(bookings) ?? []);
  }, [bookings])

  const handleEventClick = (selected: EventClickArg) => {
    const booking = bookings.find((b) => b.code === selected.event.title);
    if(!booking) return;
    setSelectedBooking(booking);
    setShowEditDialog(true);
  };
  const addBookingToClient = (titleEvent: string, booking: Partial<Booking>) => {
    if (titleEvent && selectedDate) {
        const calendarApi = selectedDate.view.calendar; // Get the calendar API instance.
        calendarApi.unselect(); // Unselect the date range.

        const newEvent = {
          id: `${selectedDate.start.toISOString()}-${titleEvent}`,
          title: titleEvent,
          start: booking.startTime,
          end:
            booking.startTime && booking.totalDuration
              ? new Date(new Date(booking.startTime).getTime() + booking.totalDuration * 60 * 1000)
              : undefined, // End time is calculated by adding duration (in minutes) to start time
          allDay: false,
        };

        calendarApi.addEvent(newEvent);
    }
  }

  return (
    <div>
      <div className=" w-full px-10">

        <div className="w-full mt-8">
          <FullCalendar
            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Initialize calendar with required plugins.
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }} // Set header toolbar options.
            initialView="dayGridMonth" // Initial view mode of the calendar.
            editable={true} // Allow events to be edited.
            selectable={true} // Allow dates to be selectable.
            selectMirror={true} // Mirror selections visually.
            dayMaxEvents={true} // Limit the number of events displayed per day.
            select={handleDateClick} // Handle date selection to create new events.
            eventClick={handleEventClick} // Handle clicking on events (e.g., to delete them).
            // eventsSet={(events) => setCurrentEvents(events)} // Update state with current events whenever they change.
            datesSet={
              (dateInfo) => {
                const { start, end } = dateInfo;
                setStartTime(start);
                setEndTime(end);
                fetchBookings(start, end, auth?.accessToken ?? "");
              }
            }
            events={currentEvents} // Load events from bookings.
            initialEvents={
              typeof window !== "undefined"
                ? JSON.parse("[]")
                : []
            } // Initial events loaded from local storage.
          />
        </div>
      </div>

      {/* Dialog for adding new bookings with steps */}
      <DialogAddBookings 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        addBookingToClient={addBookingToClient}
        selectedDate={selectedDate}
      />

      <DialogEditBookingAdmin
        booking={selectedBooking}
      />
    </div>
  );
};