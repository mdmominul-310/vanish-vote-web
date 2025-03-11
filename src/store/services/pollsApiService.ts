import baseApi from "@store/api/baseApi";

const pollsApiService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPolls: builder.query({
      query: () => `/polls`,
      providesTags: ["Polls"],
    }),
    getPoll: builder.query({
      query: (id: string) => `/polls/${id}`,
      providesTags: ["Polls"],
    }),
    createPoll: builder.mutation({
      query: (data: { title: string; options: string[] }) => ({
        url: `/polls`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Polls"],
    }),
    vote: builder.mutation({
      query: (data: { pollId: string; payload: any }) => ({
        url: `/polls/${data.pollId}/vote`,
        method: "POST",
        body: data.payload,
      }),
      invalidatesTags: ["Polls"],
    }),
  }),
});

export const {
  useGetPollsQuery,
  useGetPollQuery,
  useCreatePollMutation,
  useVoteMutation,
} = pollsApiService;
