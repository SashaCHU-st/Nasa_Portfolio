import { useParams } from "react-router-dom";
import Neptune from "../backgrounds/Neptune";
import ProfileComponent from "../components/Profile/ProfileComponent";
import PauseAnimation from "../components/common/PauseAnimation";
import { useState } from "react";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden bg-black">
      <Neptune paused={paused} />
      <div
        className="absolute top-1/11 right-1/8 transform -translate-x-1/2 cursor-pointer font-orbitron uppercase w-full sm:w-32 rounded-2xl p-3
             bg-cyan-700 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center z-20"
      >
        <PauseAnimation setPaused={setPaused} paused={paused} />
      </div>
      <div className="absolute top-1/12 left-1/2 transform -translate-x-1/2 w-10/12 sm:w-8/12 md:w-6/12 max-w-[90%] px-2">
        <ProfileComponent id={Number(id!)} />
      </div>
    </div>
  );
};

export default Profile;
