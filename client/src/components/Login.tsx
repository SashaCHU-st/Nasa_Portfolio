import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email =>", email);
    console.log("Password =>", password);
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <h2 className="font-orbitron uppercase">Welcome back</h2>
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
          className="font-orbitron uppercase mt-6 border-2 border-blue-800 bg-blue-800 hover:bg-blue-600 px-8 py-4 rounded-lg uppercase font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
