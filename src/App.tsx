import CreatePoll from "@components/CreatePoll";
import ShowPoll from "@components/ShowPoll";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div
        className={
          darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }
      >
        <header className="p-6 bg-blue-600 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">VanishVote</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 border rounded-md bg-gray-800 text-white hover:bg-gray-700"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </header>

        <main className="max-w-4xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<CreatePoll />} />
            <Route path="/poll/:pollId" element={<ShowPoll />} />
          </Routes>
        </main>

        <footer className="p-6 text-center bg-gray-800 text-white">
          <p>
            &copy; {new Date().getFullYear()} VanishVote - All Rights Reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}
