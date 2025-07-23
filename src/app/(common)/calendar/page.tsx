/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useState,
  useMemo,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, User } from "lucide-react";
import { Container } from "@/components/ui-library/container";
import { useGetAllBookingsQuery } from "@/redux/features/booking/booking.api";

const resources = [
  { id: "conference-room-a", name: "Conference Room A", color: "bg-blue-500" },
  { id: "conference-room-b", name: "Conference Room B", color: "bg-green-500" },
  { id: "projector-1", name: "Projector 1", color: "bg-purple-500" },
  { id: "laptop-station", name: "Laptop Station", color: "bg-orange-500" },
  { id: "recording-studio", name: "Recording Studio", color: "bg-pink-500" },
];

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedResource, setSelectedResource] = useState("");
  const [searchTerm] = useState("");

  const filters = useMemo(
    () => ({
      searchTerm: searchTerm || undefined,
      resource: selectedResource || undefined,
      date: currentDate.toISOString().split("T")[0],
      status: undefined,
      page: "1",
      limit: "50",
    }),
    [searchTerm, selectedResource, currentDate]
  );

  const {
    data: bookingData,
    isLoading,
    isError,
  } = useGetAllBookingsQuery(filters);

  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const weekStart = getWeekStart(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    return day;
  });

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  const filteredBookings = useMemo(() => {
    const bookings =
      bookingData?.data && Array.isArray(bookingData.data)
        ? bookingData.data
        : [];

    return bookings.filter((booking: any) => {
      const bookingDate = new Date(booking.startTime);
      const isInWeek = weekDays.some(
        (day) => day.toDateString() === bookingDate.toDateString()
      );
      const matchesResource =
        !selectedResource || booking.resource === selectedResource;
      return isInWeek && matchesResource;
    });
  }, [bookingData, weekDays, selectedResource]);

  const getBookingPosition = (booking: {
    startTime: string;
    endTime: string;
  }) => {
    const startTime = new Date(booking.startTime);
    const endTime = new Date(booking.endTime);

    const startHour = startTime.getHours() + startTime.getMinutes() / 60;
    const endHour = endTime.getHours() + endTime.getMinutes() / 60;

    const top = ((startHour - 8) / 12) * 100;
    const height = ((endHour - startHour) / 12) * 100;

    return { top: `${top}%`, height: `${height}%` };
  };

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentDate(newDate);
  };

  const getResourceColor = (resourceId: string) => {
    const resource = resources.find((r) => r.id === resourceId);
    return resource?.color || "bg-gray-500";
  };

  if (isLoading) {
    return (
      <div className="text-center min-h-screen py-4">Loading bookings...</div>
    );
  }

  if (isError) {
    console.error("Failed to fetch bookings.");
  }

  return (
    <Container className="space-y-6 my-5">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar View</h1>
        <p className="text-gray-600">
          Weekly overview of all resource bookings
        </p>
      </div>

      {/* Controls */}
      <div className="card">
        <div className="flex items-center flex-wrap gap-4 justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateWeek("prev")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-gray-900">
              {weekStart.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              -{" "}
              {weekDays[6].toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h2>

            <button
              onClick={() => navigateWeek("next")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={selectedResource}
              onChange={(e) => setSelectedResource(e.target.value)}
              className="input-field"
            >
              <option value="">All Resources</option>
              {resources.map((resource) => (
                <option key={resource.id} value={resource.id}>
                  {resource.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => setCurrentDate(new Date())}
              className="btn-secondary"
            >
              Today
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="card">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Resources</h3>
        <div className="flex flex-wrap gap-4">
          {resources.map((resource) => (
            <div key={resource.id} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded ${resource.color}`}></div>
              <span className="text-sm text-gray-600">{resource.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="card overflow-auto">
        <div className="grid grid-cols-8 min-w-[600px] border-b border-gray-200">
          {/* Time column header */}
          <div className="p-4 bg-gray-50 border-r border-gray-200">
            <span className="text-sm font-medium text-gray-600">Time</span>
          </div>

          {/* Day headers */}
          {weekDays.map((day, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 text-center border-r border-gray-200 last:border-r-0"
            >
              <div className="text-sm font-medium text-gray-900">
                {day.toLocaleDateString("en-US", { weekday: "short" })}
              </div>
              <div className="text-lg font-bold text-gray-900 mt-1">
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Calendar body */}
        <div className="grid grid-cols-8 min-w-[600px] relative">
          {/* Time slots */}
          <div className="border-r border-gray-200">
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-16 p-2 border-b border-gray-100 text-sm text-gray-600"
              >
                {time}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className="relative border-r border-gray-200 last:border-r-0"
            >
              {/* Time slot grid */}
              {timeSlots.map((time) => (
                <div key={time} className="h-16 border-b border-gray-100"></div>
              ))}

              {/* Bookings */}
              {filteredBookings
                .filter((booking: { startTime: string | number | Date }) => {
                  const bookingDate = new Date(booking.startTime);
                  return bookingDate.toDateString() === day.toDateString();
                })
                .map(
                  (booking: {
                    resource?: any;
                    id?: any;
                    resourceName?: any;
                    requestedBy?: any;
                    startTime: any;
                    endTime?: string;
                  }) => {
                    if (!booking.startTime || !booking.endTime) return null;
                    const position = getBookingPosition({
                      startTime: booking.startTime,
                      endTime: booking.endTime,
                    });
                    const resourceColor = getResourceColor(booking.resource);

                    return (
                      <div
                        key={booking.id}
                        className={`absolute left-1 right-1 ${resourceColor} text-white rounded p-1 text-xs overflow-hidden shadow-sm`}
                        style={{
                          top: position.top,
                          height: position.height,
                          minHeight: "20px",
                        }}
                      >
                        <div className="font-medium truncate">
                          {booking.resourceName}
                        </div>
                        <div className="truncate opacity-90">
                          {booking.requestedBy}
                        </div>
                        <div className="text-xs opacity-75">
                          {new Date(booking.startTime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          ))}
        </div>
      </div>

      {/* Booking Details */}
      {filteredBookings.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            This Week&apos;s Bookings
          </h3>
          <div className="space-y-3">
            {filteredBookings.map(
              (booking: {
                id: Key | null | undefined;
                resource: string;
                resourceName:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                requestedBy:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                startTime: string | number | Date;
                endTime: string | number | Date;
              }) => (
                <div
                  key={booking.id}
                  className="flex items-center flex-wrap justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full ${getResourceColor(
                        booking.resource
                      )}`}
                    ></div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {booking.resourceName}
                      </div>
                      <div className="text-sm text-gray-600 flex gap-4 flex-wrap items-center space-x-4">
                        <span className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {booking.requestedBy}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(booking.startTime).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(booking.startTime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}{" "}
                          -{" "}
                          {new Date(booking.endTime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Container>
  );
}
