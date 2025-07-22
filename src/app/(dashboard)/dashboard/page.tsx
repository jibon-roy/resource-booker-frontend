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

// Mock data for bookings
const mockBookings = [
  {
    id: "1",
    resource: "conference-room-a",
    resourceName: "Conference Room A",
    startTime: "2024-01-15T10:00",
    endTime: "2024-01-15T11:30",
    requestedBy: "John Smith",
    status: "upcoming",
  },
  {
    id: "2",
    resource: "projector-1",
    resourceName: "Projector #1",
    startTime: "2024-01-15T14:00",
    endTime: "2024-01-15T15:00",
    requestedBy: "Sarah Johnson",
    status: "ongoing",
  },
  {
    id: "3",
    resource: "conference-room-b",
    resourceName: "Conference Room B",
    startTime: "2024-01-14T09:00",
    endTime: "2024-01-14T10:30",
    requestedBy: "Mike Davis",
    status: "past",
  },
  {
    id: "4",
    resource: "recording-studio",
    resourceName: "Recording Studio",
    startTime: "2024-01-16T11:00",
    endTime: "2024-01-16T13:00",
    requestedBy: "Emily Chen",
    status: "upcoming",
  },
  {
    id: "5",
    resource: "laptop-station",
    resourceName: "Laptop Station",
    startTime: "2024-01-15T16:00",
    endTime: "2024-01-15T17:30",
    requestedBy: "Alex Wilson",
    status: "upcoming",
  },
];

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

  const filteredBookings = useMemo(() => {
    return mockBookings.filter((booking) => {
      const matchesSearch =
        booking.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.resourceName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesResource =
        !selectedResource || booking.resource === selectedResource;
      const matchesDate =
        !selectedDate || booking.startTime.startsWith(selectedDate);
      const matchesStatus =
        !selectedStatus || booking.status === selectedStatus;

      return matchesSearch && matchesResource && matchesDate && matchesStatus;
    });
  }, [searchTerm, selectedResource, selectedDate, selectedStatus]);

  const groupedBookings = useMemo(() => {
    const grouped = filteredBookings.reduce((acc, booking) => {
      if (!acc[booking.resource]) {
        acc[booking.resource] = [];
      }
      acc[booking.resource].push(booking);
      return acc;
    }, {} as Record<string, typeof mockBookings>);

    // Sort bookings within each group by start time
    Object.keys(grouped).forEach((resource) => {
      grouped[resource].sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
    });

    return grouped;
  }, [filteredBookings]);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "upcoming":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "ongoing":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "past":
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return baseClasses;
    }
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

  const handleDeleteBooking = (bookingId: string) => {
    // In a real app, this would make an API call
    console.log("Delete booking:", bookingId);
  };

  return (
    <Container className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Booking Dashboard
        </h1>
        <p className="text-gray-600">Manage and view all resource bookings</p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
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

          {/* Resource Filter */}
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

          {/* Date Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Status Filter */}
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

      {/* Stats Cards */}
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
                {filteredBookings.filter((b) => b.status === "ongoing").length}
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

      {/* Bookings by Resource */}
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
          Object.entries(groupedBookings).map(([resource, bookings]) => (
            <div key={resource} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {resource
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </h3>
                <span className="text-sm text-gray-500">
                  {bookings.length} booking(s)
                </span>
              </div>

              <div className="space-y-3">
                {bookings.map((booking) => {
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
                            <span className={getStatusBadge(booking.status)}>
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
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
          ))
        )}
      </div>
    </Container>
  );
}
