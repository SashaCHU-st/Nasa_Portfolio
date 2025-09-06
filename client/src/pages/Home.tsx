import PictOfTheDay from "../components/PictOfTheDay";
import Earth from "../backgrounds/Earth";

const Home = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Earth />
      <div className="absolute top-1/2 left-[55%] sm:left-[40%] -translate-x-1/5 -translate-y-1/2 w-11/12 max-w-[55%] px-4">
        <h1
          className="font-orbitron uppercase text-2xl sm:text-3xl md:text-4xl font-bold 
             text-center text-cyan-400 tracking-widest 
             [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff]"
        >
          Picture of the Day
        </h1>
        <div
          className="relative flex flex-col items-center justify-between rounded-2xl p-6
                         bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] "
        >
          <PictOfTheDay />
        </div>
      </div>
    </div>
  );
};

export default Home;
