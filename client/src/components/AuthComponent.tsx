import { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

const AuthComponent = () => {
  const [switcher, setSwitcher] = useState(false);
  return (
    <div className="flex justify-start items-center min-h-screen">
      <div
        className="relative flex flex-col items-center justify-start rounded-2xl p-6 
                 bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff]"
      >
        {switcher ? (
          <>
            <SignUp />
            <button
              className="cursor-pointer font-sans text-center underline py-8 text-white"
              onClick={() => setSwitcher(false)}
            >
              Have an account? Login
            </button>
          </>
        ) : (
          <>
            <Login />
            <button
              className="cursor-pointer font-sans text-white text-center underline py-8"
              onClick={() => setSwitcher(true)}
            >
              Don't have an account? Register
            </button>
          </>
        )}
            <p className="text-white font-orbitron uppercase text-sm mb-4">
              * Required fields
            </p>
      </div>
    </div>
  );
};

export default AuthComponent;
