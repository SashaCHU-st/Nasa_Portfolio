import Sun from "../backgrounds/Sun";
import SearchInput from "../components/SearchInput";
import { useState } from "react";
import PauseAnimation from "../components/PauseAnimation";

const Search = () => {
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden bg-black">
      <Sun paused={paused} />
      <PauseAnimation setPaused={setPaused} paused={paused} />
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-10/12 sm:w-8/12 md:w-6/12 max-w-[90%] px-2">
        <SearchInput />
      </div>
    </div>
  );
};

export default Search;
