import {
  IPayload,
  useGetPollQuery,
  useVoteMutation,
} from "@store/services/pollsApiService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalLoading from "./GlobalLoading";
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "@store/services/commentsApiService";

function ShowPoll() {
  const { pollId } = useParams();
  const { data, isLoading } = useGetPollQuery(pollId as string);
  const { data: commentsData, isLoading: commentsLoading } =
    useGetCommentsQuery({
      postId: pollId as string,
    });
  const [createComment, { isLoading: createComLoad }] =
    useCreateCommentMutation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [vote, { isLoading: voteLoading, isSuccess }] = useVoteMutation();

  useEffect(() => {
    if (data) {
      const expirationTime = new Date(data.data.experationDate).getTime();
      const currentTime = new Date().getTime();
      setTimeLeft(
        Math.max(0, Math.floor((expirationTime - currentTime) / 1000))
      );
    }
  }, [data]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVote = () => {
    if (selectedOption && data) {
      const updatedOptions = data.data.options.map(
        (option: { name: string; votes: number }) =>
          option.name === selectedOption
            ? { ...option, votes: option.votes + 1 }
            : option
      );

      const payload: IPayload = {
        question: data.data.question,
        experationDate: data.data.experationDate,
        options: updatedOptions,
      };

      vote({ pollId: pollId as string, payload });
      // Ideally, send this updated vote data to the backend
    }
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }

    createComment({
      postId: pollId as string,
      comment: newComment,
    });
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-white">
      <GlobalLoading
        loading={isLoading || voteLoading || commentsLoading || createComLoad}
      />
      {isSuccess && (
        <p className="text-green-500 font-semibold">
          Vote submitted successfully
        </p>
      )}
      {data?.data && (
        <>
          <h2 className="text-2xl font-semibold">
            {data.data.question} (Poll ID: {pollId})
          </h2>
          <p className="mt-2 text-red-500">
            Poll ends in: {formatTime(timeLeft)}
          </p>

          {timeLeft > 0 ? (
            // Show voting options only if the poll is active
            <>
              <div className="mt-4 space-y-2">
                {data.data.options.map(
                  (
                    option: {
                      name: string;
                      votes: number;
                    },
                    index: number
                  ) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="radio"
                        id={option.name}
                        name="vote"
                        value={option.name}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                      <label htmlFor={option.name} className="cursor-pointer">
                        {option.name}
                      </label>
                    </div>
                  )
                )}
              </div>
              <button
                onClick={handleVote}
                className="w-full p-2 mt-4 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                Submit Vote
              </button>
            </>
          ) : (
            <p className="mt-4 text-green-500 font-semibold">
              Poll has ended. Here are the results:
            </p>
          )}

          {/* Show results only after poll expiration */}
          {timeLeft === 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Results</h3>
              {data.data.options.map(
                (option: { name: string; votes: number }, index: number) => (
                  <div key={index} className="mt-2">
                    <p>
                      {option.name}: {option.votes} votes
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                      <div
                        className="h-4 bg-blue-500"
                        style={{
                          width: `${
                            (option.votes /
                              (data.data.options.reduce(
                                (acc: number, curr: { votes: number }) =>
                                  acc + curr.votes,
                                0
                              ) || 1)) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Comments Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Comments</h3>
            <ul className="mt-2 space-y-1">
              {commentsData?.data.map(
                (comment: { comment: string }, index: number) => (
                  <li
                    key={index}
                    className="p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
                  >
                    {comment.comment}
                  </li>
                )
              )}
            </ul>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
              className="w-full p-2 mt-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
            />
            <button
              onClick={handleCommentSubmit}
              className="w-full p-2 mt-2 border rounded-md bg-green-500 text-white hover:bg-green-600"
            >
              Submit Comment
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShowPoll;
