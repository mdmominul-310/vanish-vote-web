import { useState } from "react";

function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState(1);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const pollDurations = [
    { label: "1 Hour", value: 1 },
    { label: "12 Hours", value: 12 },
    { label: "24 Hours", value: 24 },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-semibold">Create a Poll</h2>
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
    </div>
  );
}

export default CreatePoll;
