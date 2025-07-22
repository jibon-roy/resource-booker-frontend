import { baseApi } from "@/redux/api/baseApi";

const BookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data?.queryObj) {
          interface QueryItem {
            name: string;
            value: string | number | boolean;
          }
          data?.queryObj.forEach((item: QueryItem) => {
            params.append(item.name, String(item.value));
          });
        }
        return {
          url: `/bookings`,
          method: "GET",
          params: params,
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
