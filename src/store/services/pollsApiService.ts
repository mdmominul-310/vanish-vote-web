import baseApi from "@store/api/baseApi";

export interface IPayload {
  experationDate: Date;
  question: string;
  options: {
    name: string;
    votes: number;
  }[];
}

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
      query: (data: IPayload) => ({
        url: `/polls`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Polls"],
    }),
    vote: builder.mutation({
      query: (data: { pollId: string; payload: IPayload }) => ({
        url: `/polls/${data.pollId}`,
        method: "PATCH",
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
