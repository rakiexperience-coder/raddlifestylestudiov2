
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_KEY_STORAGE_KEY } from "../constants";

const ApiKeyPage: React.FC = () => {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedKey = apiKey.trim();

    if (!trimmedKey) {
      setError("Please enter your API key before continuing.");
      return;
    }

    // Strict format check: Must start with "AIza" and be at least 39 chars
    if (!trimmedKey.startsWith("AIza") || trimmedKey.length < 39) {
      setError("Invalid Key Format. Google API Keys must start with 'AIza'.");
      return;
    }

    // Save directly if format is valid
    localStorage.setItem(API_KEY_STORAGE_KEY, trimmedKey);
    navigate("/studio");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ivory p-4">
      <main className="w-full max-w-md bg-white p-10 rounded-xl shadow">
        <h1 className="text-2xl text-raddGold mb-6">Connect Your API Key</h1>

        <form onSubmit={handleSave} className="space-y-6">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setError("");
            }}
            placeholder="Paste your API key here"
            className={`w-full px-4 py-3 rounded-lg border ${
              error ? "border-red-400" : "border-gray-200"
            }`}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-raddGold text-white hover:bg-[#8e6f32] transition-colors"
          >
            Save & Continue
          </button>
        </form>
      </main>
    </div>
  );
};

export default ApiKeyPage;
