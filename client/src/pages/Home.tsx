import PictOfTheDay from "../components/PictOfTheDay";
import Earth from "../backgrounds/Earth";
import github from "../../public/logo/github.png";
import linkedIn from "../../public/logo/linkedIn.png";

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
            <a
              href="https://www.linkedin.com/in/aleksandra-heinanen-a63108193/"
              target="_blank"
            >
              <span className="text-cyan-400 font-semibold">
                Aleksandra Heinänen
              </span>
            </a>
            , and I’m excited to present my{" "}
            <a
              href="https://github.com/SashaCHU-st/Nasa_Portfolio"
              target="_blank"
            >
              <span className="text-cyan-300">Full Stack Project</span>.
            </a>
          </h2>
          <p className="text-lg sm:text-xl md:text-xl  mt-2">
            Built with
            <span className="font-semibold"> React</span>,
            <span className="font-semibold"> Three.js</span>,
            <span className="font-semibold"> TypeScript</span>,
            <span className="font-semibold"> Node.js</span>,
            <span className="font-semibold"> Fastify</span>, and
            <span className="font-semibold"> PostgreSQL</span>.
          </p>
          <div className="flex justify-end gap-4 w-full mt-4">
            <a
              className="cursor-pointer"
              href="https://github.com/SashaCHU-st/Nasa_Portfolio"
              target="_blank"
            >
              <img src={github} alt="github" className="h-8" />
            </a>
            <a
              className="cursor-pointer"
              href="https://www.linkedin.com/in/aleksandra-heinanen-a63108193/"
              target="_blank"
            >
              <img src={linkedIn} alt="linkedIn" className="  w-10 h-8" />
            </a>
          </div>
        </div>
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
