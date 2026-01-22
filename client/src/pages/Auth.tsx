import Mars from "../backgrounds/Mars";
import AuthComponent from "../components/Auth/AuthComponent";
import { useState } from "react";
import PauseAnimation from "../components/common/PauseAnimation";

const Auth = () => {
  const [paused, setPaused] = useState(false);
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Mars paused={paused} />
      <div
        className="absolute top-2/11 right-1/8 transform -translate-x-1/2 cursor-pointer font-orbitron uppercase w-full sm:w-32 rounded-2xl p-3
             bg-cyan-700 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center z-20"
      >
        <PauseAnimation setPaused={setPaused} paused={paused} />
      </div>
      <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-6/12 sm:max-w-[95%] px-4">
        <AuthComponent />
      </div>
    </div>
  );
};

export default Auth;
