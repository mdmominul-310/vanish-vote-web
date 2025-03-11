import baseApi from "@store/api/baseApi";

const CommentsApiService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (data: Record<string, unknown>) => ({
        url: `/comments`,
        params: data,
      }),

      providesTags: ["Comment"],
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: `/comments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation } =
  CommentsApiService;
