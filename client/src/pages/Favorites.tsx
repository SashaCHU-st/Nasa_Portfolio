import GalaxyScene from "../backgrounds/Galaxy";
import MyFavorites from "../components/MyFavorites";

const Favorites = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <GalaxyScene />
      <div className="absolute top-1/3 transform -translate-y-1/2 w-11/12 max-w-[95%] py-12">
        <h1
          className="font-orbitron uppercase text-4xl font-bold text-center text-cyan-400 tracking-widest 
                    [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff]"
        >
          My Favorites
        </h1>
        <MyFavorites />
      </div>
    </div>
  );
};

export default Favorites;
