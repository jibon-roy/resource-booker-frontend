"use client";

import type React from "react";

import { useState } from "react";
import { Clock, User, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";
import Swal from "sweetalert2";

const resources = [
  { id: "conference-room-a", name: "Conference Room A", capacity: "8 people" },
  { id: "conference-room-b", name: "Conference Room B", capacity: "12 people" },
  { id: "projector-1", name: "Projector #1", capacity: "Portable" },
  { id: "laptop-station", name: "Laptop Station", capacity: "1 person" },
  { id: "recording-studio", name: "Recording Studio", capacity: "4 people" },
];

export default function BookingForm() {
  const [formData, setFormData] = useState({
    resource: "",
    startTime: "",
    endTime: "",
    requestedBy: "",
  });

  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.resource) {
      newErrors.resource = "Please select a resource";
    }

    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }

    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }

    if (!formData.requestedBy.trim()) {
      newErrors.requestedBy = "Name is required";
    }

    if (formData.startTime && formData.endTime) {
      const start = new Date(formData.startTime);
      const end = new Date(formData.endTime);

      if (end <= start) {
        newErrors.endTime = "End time must be after start time";
      }

      const duration = (end.getTime() - start.getTime()) / (1000 * 60); // minutes
      if (duration < 15) {
        newErrors.endTime = "Booking must be at least 15 minutes";
      }

      if (duration > 120) {
        newErrors.endTime = "Booking cannot exceed 2 hours";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    console.log(formData);

    // Simulate API call
    try {
      const res = await createBooking(formData).unwrap();
      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Booking Created",
          text: "Your booking has been successfully created.",
          confirmButtonText: "OK",
          confirmButtonColor: "#2b7fff",
        });
      }
    } catch (error) {
      const err = error as { data?: { message?: string } };

      Swal.fire({
        icon: "error",
        title: "Booking creation failed",
        text: err.data?.message || "An unexpected error occurred",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#2b7fff",
      });
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        resource: "",
        startTime: "",
        endTime: "",
        requestedBy: "",
      });
      setSubmitSuccess(false);
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-md mx-auto">
        <div className="card text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-4">
            Your resource has been successfully booked. You&apos;ll receive a
            confirmation email shortly.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="btn-primary"
          >
            Book Another Resource
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Book a Resource
        </h1>
        <p className="text-gray-600">
          Reserve shared resources with automatic conflict detection
        </p>
      </div> */}

      <div className="card shadow-2xl border-0 bg-white/90 backdrop-blur-s">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resource Selection */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              Select Resource
            </label>
            <select
              value={formData.resource}
              onChange={(e) => handleInputChange("resource", e.target.value)}
              className={`input-field ${
                errors.resource ? "border border-red-500 ring-red-500" : ""
              }`}
            >
              <option value="">Choose a resource...</option>
              {resources.map((resource) => (
                <option key={resource.id} value={resource.id}>
                  {resource.name} ({resource.capacity})
                </option>
              ))}
            </select>
            {errors.resource && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.resource}
              </p>
            )}
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 mr-2" />
                Start Time
              </label>
              <input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
                className={`input-field ${
                  errors.startTime ? "border-red-500 ring-red-500" : ""
                }`}
                min={new Date().toISOString().slice(0, 16)}
              />
              {errors.startTime && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.startTime}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 mr-2" />
                End Time
              </label>
              <input
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
                className={`input-field ${
                  errors.endTime ? "border-red-500 ring-red-500" : ""
                }`}
                min={
                  formData.startTime || new Date().toISOString().slice(0, 16)
                }
              />
              {errors.endTime && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.endTime}
                </p>
              )}
            </div>
          </div>

          {/* Requested By */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2" />
              Requested By
            </label>
            <input
              type="text"
              value={formData.requestedBy}
              onChange={(e) => handleInputChange("requestedBy", e.target.value)}
              placeholder="Enter your full name"
              className={`input-field ${
                errors.requestedBy ? "border-red-500 ring-red-500" : ""
              }`}
            />
            {errors.requestedBy && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.requestedBy}
              </p>
            )}
          </div>

          {/* Buffer Time Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-blue-900 mb-1">
                  Buffer Time Policy
                </h4>
                <p className="text-sm text-blue-700">
                  A 10-minute buffer is automatically added before and after
                  each booking to prevent conflicts. Your actual booking time
                  will be protected with this buffer zone.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full cursor-pointer btn-primary ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting || isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Checking Availability...
              </div>
            ) : (
              "Book Resource"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
