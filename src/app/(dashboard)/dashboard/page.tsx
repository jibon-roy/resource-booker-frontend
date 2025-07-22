/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import {
  Calendar,
  Filter,
  Search,
  Clock,
  User,
  MapPin,
  Trash2,
} from "lucide-react";
import { Container } from "@/components/ui-library/container";
import {
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
} from "@/redux/features/booking/booking.api";
import Swal from "sweetalert2";

type Booking = {
  id: string;
  resource: string;
  requestedBy: string;
  startTime: string;
  endTime: string;
};

const resources = [
  "conference-room-a",
  "conference-room-b",
  "projector-1",
  "laptop-station",
  "recording-studio",
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResource, setSelectedResource] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // ✅ API Call (Filters as Query)
  const { data, isLoading, refetch } = useGetAllBookingsQuery({
    searchTerm,
    resource: selectedResource,
    date: selectedDate,
    status: selectedStatus,
    page: 1,
    limit: 50,
  });

  const [deleteBooking] = useDeleteBookingMutation();

  // ✅ Add Status calculation manually if backend not returning it
  const bookings = useMemo(() => {
    if (!data?.data) return [];
    const now = new Date();

    return data.data.map((b: Booking) => {
      const start = new Date(b.startTime);
      const end = new Date(b.endTime);

      let status: string = "upcoming";
      if (now >= start && now <= end) {
        status = "ongoing";
      } else if (now > end) {
        status = "past";
      }

      return { ...b, status };
    });
  }, [data]);

  const groupedBookings = useMemo(() => {
    const grouped = bookings.reduce((acc: any, booking: any) => {
      if (!acc[booking.resource]) acc[booking.resource] = [];
      acc[booking.resource].push(booking);
      return acc;
    }, {});

    Object.keys(grouped).forEach((resource) =>
      grouped[resource].sort(
        (a: any, b: any) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )
    );
    return grouped;
  }, [bookings]);

  const handleDeleteBooking = async (bookingId: string) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await deleteBooking(bookingId).unwrap();
          Swal.fire({
            icon: "success",
            title: "Booking Deleted",
            text: "The booking has been successfully deleted.",
            confirmButtonColor: "#2b7fff",
          });
          refetch();
        }
      } catch (error) {
        if (error)
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete booking. Please try again.",
            confirmButtonColor: "#2b7fff",
          });
        return;
      }
    });
  };

  const getStatusBadge = (status: string) => {
    const base = "px-2 py-1 rounded-full text-xs font-medium";
    return status === "ongoing"
      ? `${base} bg-green-100 text-green-800`
      : status === "past"
      ? `${base} bg-gray-100 text-gray-800`
      : `${base} bg-blue-100 text-blue-800`;
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter(
      (booking: {
        requestedBy: string;
        resource: string;
        startTime: string | number | Date;
        status: string;
      }) => {
        const matchesSearch =
          booking.requestedBy
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.resource.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesResource =
          !selectedResource || booking.resource === selectedResource;
        const matchesDate =
          !selectedDate ||
          new Date(booking.startTime).toISOString().split("T")[0] ===
            selectedDate;
        const matchesStatus =
          !selectedStatus || booking.status === selectedStatus;

        return matchesSearch && matchesResource && matchesDate && matchesStatus;
      }
    );
  }, [bookings, searchTerm, selectedResource, selectedDate, selectedStatus]);

  return (
    <Container className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Booking Dashboard
        </h1>
        <p className="text-gray-600">Manage and view all resource bookings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Bookings
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredBookings.length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ongoing</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  filteredBookings.filter(
                    (b: { status: string }) => b.status === "ongoing"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resources</p>
              <p className="text-2xl font-bold text-gray-900">
                {Object.keys(groupedBookings).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedResource}
              onChange={(e) => setSelectedResource(e.target.value)}
              className="input-field pl-10"
            >
              <option value="">All Resources</option>
              {resources.map((resource) => (
                <option key={resource} value={resource}>
                  {resource
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field pl-10"
            >
              <option value="">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading bookings...</p>
      ) : (
        <div className="space-y-6">
          {Object.keys(groupedBookings).length === 0 ? (
            <div className="card text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or create a new booking.
              </p>
            </div>
          ) : (
            Object.entries(groupedBookings)?.map(
              ([resource, resourceBookings]) => (
                <div key={resource} className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {resource
                        .replace("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {Array.isArray(resourceBookings)
                        ? resourceBookings.length
                        : 0}{" "}
                      booking(s)
                    </span>
                  </div>

                  <div className="space-y-3">
                    {Array.isArray(resourceBookings) &&
                      resourceBookings.map((booking: any) => {
                        const startDateTime = formatDateTime(booking.startTime);
                        const endDateTime = formatDateTime(booking.endTime);

                        return (
                          <div
                            key={booking.id}
                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-4 mb-2">
                                  <span
                                    className={getStatusBadge(booking.status)}
                                  >
                                    {booking.status.charAt(0).toUpperCase() +
                                      booking.status.slice(1)}
                                  </span>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <User className="w-4 h-4 mr-1" />
                                    {booking.requestedBy}
                                  </div>
                                </div>

                                <div className="flex items-center space-x-6 text-sm text-gray-600">
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {startDateTime.date}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {startDateTime.time} - {endDateTime.time}
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="p-2 text-gray-400 hover:text-red-600 cursor-pointer hover:bg-red-50 rounded-lg transition-colors"
                                title="Cancel booking"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )
            )
          )}
        </div>
      )}
    </Container>
  );
}
