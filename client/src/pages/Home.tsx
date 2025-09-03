import PictOfTheDay from "../components/PictOfTheDay";
import Earth from "../backgrounds/Earth";

const Home = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Earth />
      <div className="absolute top-1/2 left-[40%] transform -translate-y-1/2 w-11/12 md:w-[36rem] lg:w-[34rem] xl:w-[52rem] max-w-[60vw]">
        <h1 className="font-orbitron uppercase text-4xl font-bold text-center text-cyan-400 tracking-widest 
             [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff]">
          Picture of the Day
        </h1>
        <div className="relative flex flex-col items-center justify-between rounded-2xl p-6
                         bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] ">
          <PictOfTheDay />
        </div>
      </div>
    </div>
  );
};

export default Home;
// relative flex flex-col items-center justify-between rounded-2xl p-6 h-[420px] 
//                          bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] 
//                          hover:scale-105 hover:shadow-[0_0_30px_#0ff] transition-all duration-300