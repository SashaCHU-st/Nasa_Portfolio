import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BACK_API = import.meta.env.VITE_BACKEND_API;
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const { login: loginUser } = useAuth();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const results = await fetch(`${BACK_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await results.json();

      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      loginUser();
      // console.log("DATA", data);
      navigate("/home");
    } catch (err: any) {
      console.error("Error", err);
      setError(err.message || "Something went wrong");
    }
  };
  return (
    <div>
      {error && (
        <h2
          className="font-orbitron uppercase text-m sm:text-m md:text-m font-bold text-white tracking-widest
               [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff] mb-6 text-center"
        >
          {error}
        </h2>
      )}
      <div className="flex justify-center items-center">
        <h2
          className="font-orbitron uppercase text-4xl font-bold text-center text-cyan-400 tracking-widest 
             [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff]"
        >
          Welcome back
        </h2>
      </div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center w-full"
      >
        <input
          className="font-orbitron uppercase border-4 border-gray-500 rounded my-8 p-4 w-96 text-gray-200"
          type="email"
          placeholder="Please write your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative w-96 my-8">
          <input
            className="font-orbitron uppercase border-4 border-gray-500 rounded p-4 w-full text-gray-200"
            type={showPassword ? "text" : "password"}
            placeholder="Please write your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          type="submit"
          className="font-orbitron uppercase w-32 rounded-2xl p-4
                    bg-[#0d1b2a]/80 border bg-cyan-700 border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
