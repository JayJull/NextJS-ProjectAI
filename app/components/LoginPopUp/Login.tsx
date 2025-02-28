"use client"
import { useState } from "react";

const LoginPopUp = ({ onClose, onLoginSuccess, onSignupSuccess }:any) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Import dynamically to avoid server component issues
      const { login } = await import('@/lib/data');
      
      const result = await login({
        username,
        password,
        rememberMe,
      });

      if (result.success) {
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          // Fallback if no callback provided
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

  const handleSignupSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Password validation
    if (password !== confirmPassword) {
      setError("Password tidak cocok. Silakan periksa kembali.");
      setIsLoading(false);
      return;
    }

    try {
      // Import dynamically to avoid server component issues
      const { signup } = await import('@/lib/data');
      
      const result = await signup({
        username,
        password,
      });

      if (result.success) {
        if (onSignupSuccess) {
          onSignupSuccess();
        } else {
          // Switch to login mode after successful signup
          setIsLoginMode(true);
          setError("");
          // Clear fields
          setPassword("");
          setConfirmPassword("");
        }
      } else {
        setError(result.error || "Pendaftaran gagal. Silakan coba lagi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form default-form">
      <div className="form-inner space-y-6">
        {/* Toggle buttons */}
        <div className="flex border-b border-gray-200">
          <button
            className={`w-1/2 py-2 font-medium text-center ${isLoginMode ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setIsLoginMode(true)}
            type="button"
          >
            Log In
          </button>
          <button
            className={`w-1/2 py-2 font-medium text-center ${!isLoginMode ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setIsLoginMode(false)}
            type="button"
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {isLoginMode ? (
          // Login Form
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
        ) : (
          // Signup Form
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="signup-username" className="text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="signup-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password" className="text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="signup-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password" className="text-gray-700">
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Konfirmasi Password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="form-group">
              <button
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Sign Up"}
              </button>
            </div>
          </form>
        )}
        {/* End form */}
      </div>
    </div>
  );
};

export default LoginPopUp;


// import React, { useRef } from 'react';
// import * as bcrypt from 'bcryptjs';

// interface LoginData {
//   user: string;
//   hashedPassword: string;
// }

// const Login: React.FC = () => {
//   const usernameInput = useRef<HTMLInputElement | null>(null);
//   const passwordInput = useRef<HTMLInputElement | null>(null);

//   const SignUpForm = (e: React.FormEvent) => {
//     e.preventDefault();
//     const user = usernameInput.current?.value || '';
//     const password = passwordInput.current?.value || '';

//     const hashedPassword = bcrypt.hashSync(password, 10);
//     console.log('passowrd has bcrypt: ', hashedPassword)
//     window.localStorage.setItem('login', JSON.stringify({ user, hashedPassword }));
//   };

//   const LoginForm = (e: React.FormEvent) => {
//     e.preventDefault();
//     const user = usernameInput.current?.value || '';
//     const password = passwordInput.current?.value || '';

//     const savedLogin = window.localStorage.getItem('login');
//     if (!savedLogin) {
//       console.log('No user found');
//       return;
//     }

//     const { hashedPassword }: LoginData = JSON.parse(savedLogin);

//     bcrypt.compare(password, hashedPassword, (err, isMatch) => {
//       if (err) {
//         throw err;
//       } else if (!isMatch) {
//         console.log('Incorrect password');
//       } else {
//         console.log('Login successful');
//       }
//     });
//   };

//   return (
//     <div>
//       <input type="email" name="email" id="email" ref={usernameInput} />
//       <input type="password" name="password" id="password" ref={passwordInput} />
//       <button type="submit" onClick={(e) => SignUpForm(e)}>
//         Sign Up
//       </button>
//       <button type="submit" onClick={(e) => LoginForm(e)}>
//         Log in
//       </button>
//     </div>
//   );
// };

// export default Login;
