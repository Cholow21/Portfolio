import { useState } from "react";

export default function Login({ onLogin, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple authentication (in production, use proper backend authentication)
    if (username === "admin" && password === "cholotheadmin") {
      onLogin();
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-[100] p-4">
      <div className="bg-white text-black rounded-lg shadow-2xl max-w-md w-full p-8 border border-gray-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold transition-colors duration-300"
        >
          ✕
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🔐</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Login as Admin</h2>
          <p className="text-gray-600 text-sm">Access the admin panel to edit your portfolio</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
              placeholder="Enter username"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-md text-sm border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 rounded-md hover:bg-gray-800 transition-all duration-300"
          >
            Login to Admin Panel
          </button>
        </form>

        
      </div>
    </div>
  );
}
