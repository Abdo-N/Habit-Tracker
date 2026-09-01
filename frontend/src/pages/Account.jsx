import React, { useState } from 'react';
import api from "../lib/axios.js";
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/account/login" : "/account/signup";
      const res = await api.post(endpoint, { email, password });
      
      localStorage.setItem("token", res.data.token);
      
      // Use window.location for a hard redirect
      window.location.href = "/";
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.message || "Something went wrong";
      setError(typeof msg === "string" ? msg : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="mockup-window bg-base-100 border border-base-300 w-full max-w-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </h1>

          {error && (
            <div className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          {/* Email input — now controlled */}
          <input 
            type="text" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full mb-3" 
          />

          {/* Password input — now controlled */}
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full mb-4" 
          />

          {/* Submit button wrapped in a form */}
          <form onSubmit={handleSubmit}>
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary w-full mb-3"
            >
              {loading ? "Loading..." : (isLogin ? "Login" : "Sign Up")}
            </button>
          </form>

          {/* Toggle between login/signup */}
          <p className="text-center text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="link link-primary"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;