import EditProfile from "../components/EditProfile";
import Venus from "../backgrounds/Venus";
import { useState } from "react";
import PauseAnimation from "../components/PauseAnimation";
const MyProfile = () => {
  const [paused, setPaused] = useState(false);
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Venus paused={paused} />
      <div
        className="absolute top-2/11 right-1/8 transform -translate-x-1/2 cursor-pointer font-orbitron uppercase w-full sm:w-32 rounded-2xl p-3
             bg-cyan-700 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center z-20"
      >
        <PauseAnimation setPaused={setPaused} paused={paused} />
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 w-11/12 md:w-[36rem] lg:w-[34rem] xl:w-[52rem] max-w-[60vw]">
        <EditProfile />
      </div>
    </div>
  );
};

export default MyProfile;
