import Universe from "../backgrounds/Universe";
import { useState } from "react";
import PauseAnimation from "../components/PauseAnimation";

export const NotFound = () => {
  const [paused, setPaused] = useState(false);
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Universe paused={paused} />
      <div
        className="absolute top-2/11 right-1/8 transform -translate-x-1/2 cursor-pointer font-orbitron uppercase w-full sm:w-32 rounded-2xl p-3
             bg-cyan-700 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center z-20"
      >
        <PauseAnimation setPaused={setPaused} paused={paused} />
      </div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-10/12 sm:w-8/12 md:w-6/12 max-w-[90%] px-2">
        <h1
          className="font-orbitron uppercase text-3xl sm:text-4xl md:text-5xl font-bold 
                 text-cyan-400 tracking-widest"
        >
          PAGE NOT FOUND
        </h1>
      </div>
    </div>
  );
};
