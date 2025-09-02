import { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

const AuthComponent = () => {
  const [switcher, setSwitcher] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-white border-8 border-gray-500 rounded-xl p-8 w-156 h-156 flex flex-col items-center">
        {switcher ? (
          <>
            <SignUp />
            <button
              className="font-orbitron uppercase underline py-8"
              onClick={() => setSwitcher(false)}
            >
              Have an account? Login
            </button>
          </>
        ) : (
          <>
            <Login />
            <button
              className="font-orbitron uppercase underline py-8"
              onClick={() => setSwitcher(true)}
            >
              Don't have an account? Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthComponent;
