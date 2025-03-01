"use client"
import { useState } from "react";

const LoginPopUp = ({ onClose, onLoginSuccess }:any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { login, logActivity } = await import('@/lib/data');
      
      const result = await login({
        username,
        password,
        rememberMe,
      });

      if (result.success) {
        // Log the login activity
        await logActivity({
          action: "login",
          details: `User ${username} logged in`,
          ipAddress: result.ipAddress || "unknown"
        });
        
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          window.location.href = "/pages/Dashboard";
        }
      } else {
        setError(result.error || "Login gagal. Silakan coba lagi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form default-form">
      <div className="form-inner space-y-6">
        <h3 className="text-xl font-semibold text-center">Login to Admin Dashboard</h3>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="username" className="text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Remember me */}
          <div className="form-group flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="text-gray-700">
              Remember me
            </label>
          </div>

          {/* Log In Button */}
          <div className="form-group">
            <button
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Log In"}
            </button>
          </div>
        </form>
        {/* End form */}
      </div>
    </div>
  );
};

export default LoginPopUp;