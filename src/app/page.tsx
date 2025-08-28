"use client";

import { useState } from "react";
import { FaCog, FaCopy } from "react-icons/fa";

export default function Page() {
  const [tweet, setTweet] = useState("");
  const [optimized, setOptimized] = useState("");
  const [copyText, setCopyText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [options, setOptions] = useState({
    grammar: true,
    hashtags: true,
    spacing: true,
    algo: true,
    tone: "none" as "none" | "professional" | "casual" | "hype",
  });

  const toggleOption = (key: keyof typeof options) => {
    if (key === "tone") return; // handled separately
    setOptions({ ...options, [key]: !options[key] });
  };

  const handleOptimize = async () => {
    if (!tweet.trim()) {
      setOptimized("⚠️ Please enter a tweet first.");
      setCopyText("");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: tweet, options }),
      });

      const data = await res.json();
      const raw = data.optimized || "⚠️ Could not optimize tweet.";

      // Display version = compact (remove multiple blank lines)
      const displayVersion = raw.replace(/\n{2,}/g, "\n");

      setOptimized(displayVersion);
      setCopyText(raw);
    } catch (error) {
      setOptimized("❌ Error optimizing tweet.");
      setCopyText("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(true)}
        className="absolute top-6 right-6 text-gray-600 hover:text-gray-900 transition"
      >
        <FaCog size={22} />
      </button>

      {/* Header */}
      <header className="py-6 text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
          TweetAlchemy
        </h1>
      </header>

      {/* Input / Output */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 px-10 pb-4">
        {/* Input */}
        <div className="flex flex-col p-6 rounded-3xl bg-blue-100 shadow-md relative">
          <h2 className="text-lg font-semibold mb-3 text-blue-700">Your Tweet</h2>
          <textarea
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="✍️ Paste or write your tweet here..."
            className="flex-1 w-full h-full p-6 rounded-2xl bg-white/80 text-gray-800 text-lg leading-relaxed resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col p-6 rounded-3xl bg-purple-100 shadow-md relative">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-purple-700">
              Optimized Tweet
            </h2>

            <button
              onClick={() => copyText && navigator.clipboard.writeText(copyText)}
              className="text-purple-700 hover:text-purple-900 transition"
            >
              <FaCopy size={18} />
            </button>
          </div>

          <div className="flex-1 w-full h-full p-6 rounded-2xl bg-white/80 text-gray-800 text-lg leading-relaxed overflow-hidden whitespace-pre-line">
            {loading
              ? "⚡ Optimizing your tweet..."
              : optimized || "✨ Optimized tweet will appear here..."}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="py-6 px-10">
        <button
          onClick={handleOptimize}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold text-xl shadow-md hover:scale-[1.02] transition-all duration-300 disabled:opacity-70"
        >
          {loading ? "Optimizing..." : "Optimize Tweet 🚀"}
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-3xl shadow-xl w-96 p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Optimization Settings ⚙️
            </h3>

            <div className="space-y-3">
              {/* Grammar */}
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.grammar}
                  onChange={() => toggleOption("grammar")}
                  className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-gray-700">Check Grammar</span>
              </label>

              {/* Spacing */}
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.spacing}
                  onChange={() => toggleOption("spacing")}
                  className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-gray-700">Fix Spacing / Arrangement</span>
              </label>

              {/* Hashtags */}
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.hashtags}
                  onChange={() => toggleOption("hashtags")}
                  className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-gray-700">Add Hashtags</span>
              </label>

              {/* Algo */}
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.algo}
                  onChange={() => toggleOption("algo")}
                  className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-gray-700">Algorithm Optimization</span>
              </label>

              {/* Tone Dropdown */}
              <div className="mt-4">
                <label className="block text-gray-700 mb-1">Tone Style</label>
                <select
                  value={options.tone}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      tone: e.target.value as typeof options.tone,
                    })
                  }
                  className="w-full rounded-lg border-blue-700 focus:ring-purple-500 focus:border-purple-500 text-black"
                >
                  <option value="none">None</option>
                  <option value="professional">Professional</option>
                  <option value="casual">Casual / Friendly</option>
                  <option value="hype">Hype / Marketing</option>
                </select>
              </div>

            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSettings(false)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium shadow-md hover:scale-[1.03] transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
