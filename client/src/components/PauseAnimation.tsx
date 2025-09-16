import type { PauseProps } from "../types/types";

const PauseAnimation = ({ setPaused, paused }: PauseProps) => {
  return (
    <div>
      {" "}
      <button onClick={() => setPaused(!paused)}>
        {paused ? "Resume" : "Pause Animation"}
      </button>
    </div>
  );
};

export default PauseAnimation;
