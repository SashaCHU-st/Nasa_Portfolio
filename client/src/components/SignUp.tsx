import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/InputValidation";

const BACK_API = import.meta.env.VITE_BACKEND_API;

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [errorName, setErrorName] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const nameError = validateName(name);
    setErrorEmail(emailErr);
    setErrorPassword(passwordErr);
    setErrorName(nameError);

    if (emailErr || passwordErr || nameError) return;
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
      loginUser();
      navigate("/home");
    } catch (err: any) {
      console.error("Error", err);
      setErrorEmail(err.message || "Something went wrong");
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center my-4">
        <h2
          className="font-orbitron uppercase text-4xl font-bold text-center text-cyan-400 tracking-widest 
                 [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff]"
        >
          Register
        </h2>
      </div>
      <form
        onSubmit={handleSignUp}
        className="flex flex-col items-center w-full"
      >
        {errorName ? (
          <h2
            className="font-orbitron uppercase text-l sm:text-l md:text-l font-bold text-red-600 tracking-widest
                    text-center"
          >
            {errorName}
          </h2>
        ) : null}
        <input
          className="font-orbitron uppercase border-4 border-gray-500 rounded my-4 p-4 w-96 text-gray-200"
          type="text"
          placeholder={`Please write your name * ` }
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errorEmail ? (
          <h2
            className="font-orbitron uppercase text-l sm:text-l md:text-l font-bold text-red-600 tracking-widest
                   text-center"
          >
            {errorEmail}
          </h2>
        ) : null}
        <input
          className="font-orbitron uppercase border-4 border-gray-500 rounded my-4 p-4 w-96 text-gray-200"
          type="email"
          placeholder={`Please write your email * ` }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative w-96">
          {errorPassword ? (
            <h2
              className="font-orbitron uppercase text-l sm:text-l md:text-l font-bold text-red-600 tracking-widest
                     text-center"
            >
              {errorPassword}
            </h2>
          ) : null}
          <input
            className="font-orbitron uppercase border-4 border-gray-500 rounded my-4 p-4 w-full text-gray-200"
            type={showPassword ? "text" : "password"}
            placeholder={`Please write your password * ` }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <button
          type="submit"
          className="cursor-pointer font-orbitron uppercase w-32 rounded-2xl p-4
                        bg-[#0d1b2a]/80 border bg-cyan-700 border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center"
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
