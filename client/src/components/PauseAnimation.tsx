import type{ PauseProps } from "../types/types";

const PauseAnimation = ({ setPaused, paused }: PauseProps) => {
  return (
    <div>
      {" "}
      <button
        onClick={() => setPaused(!paused)}
        className="absolute top-2/10 left-1/8 transform -translate-x-1/2 cursor-pointer font-orbitron uppercase w-full sm:w-32 rounded-2xl p-3
             bg-cyan-700 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center z-20"
      >
        {paused ? "Resume" : "Pause Animation"}
      </button>
    </div>
  );
};

export default PauseAnimation;
