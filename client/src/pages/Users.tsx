import { useState } from "react";
import Moon from "../backgrounds/Moon";
import UsersCard from "../components/UsersCard/UsersCard";
import PauseAnimation from "../components/common/PauseAnimation";

const Users = () => {
  const [paused, setPaused] = useState(false);
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden bg-black">
      <Moon paused={paused} />
      <div
        className="absolute top-2/11 right-1/8 transform -translate-x-1/2 cursor-pointer font-orbitron uppercase w-full sm:w-32 rounded-2xl p-3
             bg-cyan-700 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center z-20"
      >
        <PauseAnimation setPaused={setPaused} paused={paused} />
      </div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-10/12 sm:w-8/12 md:w-6/12 max-w-[90%] px-2">
        <h1
          className="font-orbitron uppercase text-sm sm:text-lg md:text-xl font-bold text-center text-cyan-400 tracking-widest
                     [text-shadow:0_0_2px_#0ff,0_0_2px_#0ff] mb-4"
        >
          Users
        </h1>
        <UsersCard />
      </div>
    </div>
  );
};

export default Users;
