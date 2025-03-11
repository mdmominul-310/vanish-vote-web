import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShowPoll() {
  const { pollId } = useParams();
  const [votes, setVotes] = useState<{ [key: string]: number }>({
    JavaScript: 10,
    Python: 8,
    "C++": 5,
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [comments, setComments] = useState([
    "Great poll!",
    "I love JavaScript!",
  ]);
  const [newComment, setNewComment] = useState("");
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVote = () => {
    if (selectedOption) {
      setVotes({ ...votes, [selectedOption]: votes[selectedOption] + 1 });
    }
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-semibold">
        What is your favorite programming language? (Poll ID: {pollId})
      </h2>
      <p className="mt-2 text-red-500">Poll ends in: {formatTime(timeLeft)}</p>
      <div className="mt-4 space-y-2">
        {Object.keys(votes).map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              id={option}
              name="vote"
              value={option}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <label htmlFor={option} className="cursor-pointer">
              {option}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleVote}
        className="w-full p-2 mt-4 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
      >
        Submit Vote
      </button>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Results</h3>
        {Object.keys(votes).map((option, index) => (
          <div key={index} className="mt-2">
            <p>
              {option}: {votes[option]} votes
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
              <div
                className="h-4 bg-blue-500"
                style={{
                  width: `${
                    (votes[option] /
                      Object.values(votes).reduce((a, b) => a + b)) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Comments</h3>
        <ul className="mt-2 space-y-1">
          {comments.map((comment, index) => (
            <li
              key={index}
              className="p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
            >
              {comment}
            </li>
          ))}
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
    </div>
  );
}

export default ShowPoll;
