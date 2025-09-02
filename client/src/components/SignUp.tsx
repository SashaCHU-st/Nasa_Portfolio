import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BACK_API = import.meta.env.VITE_BACKEND_API;

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const results = await fetch(`${BACK_API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await results.json();

      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      loginUser()
      navigate("/home");
    } catch (err: any) {
      console.error("Error", err);
      setError(err.message || "Something went wrong");
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <h2 className="font-orbitron uppercase">Register</h2>
      </div>
      <form
        onSubmit={handleSignUp}
        className="flex flex-col items-center w-full"
      >
        <input
          className="font-orbitron uppercase border-4 border-gray-500 rounded my-8 p-4 w-96 text-gray-200"
          type="text"
          placeholder="Please write your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          className="font-orbitron uppercase mt-6 border-2 border-blue-800 bg-blue-800 hover:bg-blue-600 px-8 py-4 rounded-lg uppercase font-bold"
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
