import { useState } from 'react';
import Saturn from '../backgrounds/Saturn';
import Details from '../components/Details';
import PauseAnimation from '../components/PauseAnimation';

const MoreDetails = () => {
  const [paused, setPaused] = useState(false);
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Saturn paused={paused} />
      <div
        className="absolute top-1/11 right-1/8 transform -translate-x-1/2 cursor-pointer font-orbitron uppercase w-full sm:w-32 rounded-2xl p-3
             bg-cyan-700 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center z-20"
      >
        <PauseAnimation setPaused={setPaused} paused={paused} />
      </div>
      <div className="absolute top-1/2  transform -translate-y-1/2  max-w-[95%] px-4">
        <Details />
      </div>
    </div>
  );
};

export default MoreDetails;
