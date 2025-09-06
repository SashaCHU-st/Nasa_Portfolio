import GalaxyScene from "../backgrounds/Galaxy";
import MyFavorites from "../components/MyFavorites";

const Favorites = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <GalaxyScene  /> 
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-10/12 sm:w-8/12 md:w-6/12 max-w-[90%] px-2">
        <h1
          className="font-orbitron uppercase text-2xl sm:text-3xl font-bold text-center text-cyan-400 tracking-widest
                     [text-shadow:0_0_3px_#0ff,0_0_3px_#0ff] mb-4"
        >
          My Favorites
        </h1>
        <MyFavorites  /> 
      </div>
    </div>
  );
};

export default Favorites;
