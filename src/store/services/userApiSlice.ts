import baseApi from "../api/baseApi";


export const userApiSlice = baseApi.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: () => `/user`,
            providesTags: ["User"]
        })
    })
});

export const { useGetUserQuery } = userApiSlice;