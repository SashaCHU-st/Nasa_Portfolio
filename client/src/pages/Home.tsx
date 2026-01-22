import PictOfTheDay from "../components/Home/PictOfTheDay";
import Earth from "../backgrounds/Earth";
import { useState } from "react";
import PauseAnimation from "../components/common/PauseAnimation";
import About from "../components/Home/About";

const Home = () => {
  const [paused, setPaused] = useState(false);
  return (
    <div className="relative min-h-screen w-full flex justify-center items-center overflow-x-hidden">
      <Earth paused={paused} />
      <div
        className="absolute top-2/11 right-1/8 transform -translate-x-1/2 cursor-pointer font-orbitron uppercase w-full sm:w-32 rounded-2xl p-3
             bg-cyan-700 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center z-20"
      >
        <PauseAnimation setPaused={setPaused} paused={paused} />
      </div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-10/12 sm:w-8/12 md:w-6/12 max-w-[90%] px-2">
        <About />
        <div className="flex flex-col items-center space-y-6 pt-20">
          <h1
            className="font-orbitron uppercase text-3xl sm:text-4xl md:text-5xl font-bold 
                 text-cyan-400 tracking-widest"
          >
            Picture of the Day
          </h1>

          <div
            className="relative flex flex-col items-center rounded-2xl p-6
                 bg-[#0d1b2a]/90 border border-cyan-500 shadow-[0_0_20px_#0ff]
                 backdrop-blur-md"
          >
            <PictOfTheDay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
