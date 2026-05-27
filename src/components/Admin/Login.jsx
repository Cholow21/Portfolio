import { useState } from "react";

export default function Login({ onLogin, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "cholotheadmin") {
      onLogin();
      setError("");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex justify-center items-center z-[100] p-4">
      <div className="bg-white text-black max-w-sm w-full relative">
        {/* Header bar */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-black/10">
          <div>
            <h2 className="text-lg font-black tracking-tight">Admin Login</h2>
            <p className="text-xs font-mono text-gray-400 mt-0.5">Portfolio management</p>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-mono tracking-widest uppercase border border-black/20 px-3 py-1.5 hover:bg-black hover:text-white transition-all duration-300"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-xs font-mono tracking-widest uppercase text-gray-400 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-black/20 text-sm focus:outline-none focus:border-black transition-colors duration-300 font-mono"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono tracking-widest uppercase text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-black/20 text-sm focus:outline-none focus:border-black transition-colors duration-300 font-mono"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <p className="text-xs font-mono text-red-600 border border-red-200 bg-red-50 px-4 py-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white text-xs font-mono tracking-widest uppercase py-4 hover:bg-gray-900 transition-all duration-300"
          >
            Login →
          </button>
        </form>
      </div>
    </div>
  );
}
