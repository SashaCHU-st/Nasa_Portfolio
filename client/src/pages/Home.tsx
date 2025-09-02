import PictOfTheDay from "../components/PictOfTheDay";
import Earth from "../backgrounds/Earth";

const Home = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Earth />
      <div className="absolute top-1/2 left-[50%] transform -translate-y-1/2 w-11/12 md:w-[36rem] lg:w-[44rem] xl:w-[52rem] max-w-[90vw]">
        <h1 className="font-orbitron uppercase text-white text-2xl mb-4 text-center">
          Picture of the Day
        </h1>
        <div className="border-8 border-gray-500 rounded-4xl p-6">
          <PictOfTheDay />
        </div>
      </div>
    </div>
  );
};

export default Home;
