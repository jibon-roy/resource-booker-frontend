import { baseApi } from "@/redux/api/baseApi";

const BookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters?.searchTerm)
          params.append("searchTerm", filters.searchTerm);
        if (filters?.resource) params.append("resource", filters.resource);
        if (filters?.date) params.append("date", filters.date);
        if (filters?.status) params.append("status", filters.status);
        params.append("page", filters?.page || "1");
        params.append("limit", filters?.limit || "50");

        return {
          url: `/bookings?${params.toString()}`,  
          method: "GET",
        };
      },
      providesTags: ["booking"],
    }),
    getSingleBooking: builder.query({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),

    createBooking: builder.mutation({
      query: (data) => {
        return {
          url: "/bookings",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["booking"],
    }),
    deleteBooking: builder.mutation({
      query: (id) => {
        return {
          url: `/bookings/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["booking"],
    }),
    updateBooking: builder.mutation({
      query: (data) => {
        return {
          url: `/bookings/${data?.id}`,
          method: "PUT",
          body: data?.formData,
        };
      },
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetSingleBookingQuery,
  useCreateBookingMutation,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} = BookingApi;
