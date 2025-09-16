import Universe from "../backgrounds/Universe";

export const NotFound = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Universe />
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-10/12 sm:w-8/12 md:w-6/12 max-w-[90%] px-2">
        <h1
          className="font-orbitron uppercase text-3xl sm:text-4xl md:text-5xl font-bold 
                 text-cyan-400 tracking-widest"
        >
          PAGE NOT FOUND
        </h1>
      </div>
    </div>
  );
};
