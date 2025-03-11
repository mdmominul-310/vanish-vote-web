import { useCreatePollMutation } from "@store/services/pollsApiService";
import { useEffect, useState } from "react";
import SuccessModalPOlls from "./SuccessPollsModal";
import GlobalLoading from "./GlobalLoading";

interface IPayload {
  experationDate: Date;
  question: string;
  options: {
    name: string;
    votes: number;
  }[];
}

function CreatePoll() {
  const [isOpen, setIsOpen] = useState(false);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState(1);
  const [createPoll, { isLoading, isSuccess, error, data }] =
    useCreatePollMutation();

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };
  const handleGoPOlls = () => {
    window.location.href = "/poll/" + data?.data?.id;
    setIsOpen(false);
  };

  const handleShare = () => {
    // compied to clipboard
    navigator.clipboard.writeText(
      window.location.href + "/poll/" + data?.data?.id
    );

    window.alert("Link copied to clipboard");
    setIsOpen(false);
  };

  const pollDurations = [
    { label: "1 Hour", value: 1 },
    { label: "12 Hours", value: 12 },
    { label: "24 Hours", value: 24 },
  ];

  const handleSubmit = () => {
    const payload: IPayload = {
      question: question,
      experationDate: new Date(Date.now() + duration * 60 * 60 * 1000),
      options: options.map((name) => ({ name, votes: 0 })),
    };

    createPoll(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(true);
    }
  }, [isSuccess]);

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-semibold">Create a Poll</h2>
      {error && (
        <p className="text-red-500">
          {"data" in error &&
          error.data &&
          "errorMessages" in
            (error.data as { errorMessages: { message: string }[] }) &&
          Array.isArray(
            (error.data as { errorMessages: { message: string }[] })
              .errorMessages
          )
            ? (
                error.data as { errorMessages: { message: string }[] }
              ).errorMessages.map((data, index) => (
                <span key={index}>{data?.message}, </span>
              ))
            : "An error occurred"}
        </p>
      )}

      {isSuccess && <p className="text-green-500">Poll created successfully</p>}
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question"
        className="w-full p-2 border rounded-md mt-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
      />
      <div className="space-y-2 mt-4">
        {options.map((option, index) => (
          <input
            key={index}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
          />
        ))}
        <button
          onClick={addOption}
          className="w-full p-2 mt-2 border rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Add Option
        </button>
      </div>
      <select
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        className="w-full p-2 border rounded-md mt-4 bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
      >
        {pollDurations.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label}
          </option>
        ))}
      </select>
      <button
        className="w-full p-2 mt-4 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
        onClick={handleSubmit}
        // disabled={loading}
        disabled={isLoading}
      >
        Create Poll
      </button>
      <SuccessModalPOlls
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onGoToPolls={handleGoPOlls}
        onShare={handleShare}
      />
      <GlobalLoading loading={isLoading} />
    </div>
  );
}

export default CreatePoll;
