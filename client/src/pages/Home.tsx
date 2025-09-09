import PictOfTheDay from "../components/PictOfTheDay";
import Earth from "../backgrounds/Earth";

const Home = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-center overflow-x-hidden">
      <Earth />
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-10/12 sm:w-8/12 md:w-6/12 max-w-[90%] px-2">
        <div
          className="sm:top-2/3 w-6/12 sm:w-11/12 relative flex flex-col items-center rounded-2xl p-6
             bg-[#0d1b2a]/90 border border-cyan-500 shadow-[0_0_20px_#0ff]
             text-white font-sans text-center backdrop-blur-md"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed">
            Hello, I’m{" "}
            <span className="text-cyan-400 font-semibold">
              Aleksandra Heinänen
            </span>
            , and I’m excited to present my{" "}
            <span className="text-cyan-300">Full Stack Project</span>.
          </h2>
          <p className="text-xl sm:text-base text-cyan-200 mt-2">
            Built with
            <span className="text-cyan-400 font-semibold"> React</span>,
            <span className="text-cyan-400 font-semibold"> Three.js</span>,
            <span className="text-cyan-400 font-semibold"> TypeScript</span>,
            <span className="text-cyan-400 font-semibold"> Node.js</span>,
            <span className="text-cyan-400 font-semibold"> Fastify</span>, and
            <span className="text-cyan-400 font-semibold"> PostgreSQL</span>.
          </p>
        </div>
        <div className="flex flex-col items-start space-y-6 pt-20">
          <h1
            className="font-orbitron uppercase text-3xl sm:text-4xl md:text-5xl font-bold 
                 text-cyan-400 tracking-widest 
                 [text-shadow:0_0_10px_#0ff,0_0_20px_#0ff]"
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
