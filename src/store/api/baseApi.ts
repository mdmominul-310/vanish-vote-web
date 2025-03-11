// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vanish-vote-be.onrender.com/api/v1",
  }),
  reducerPath: "baseApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["Polls", " Comment"],
  endpoints: () => ({}),
});

export default baseApi;
