import Moon from "../backgrounds/Moon";
import UsersCard from "../components/UsersCard";

const Users = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Moon /> 
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8/12 sm:max-w-[80%] px-1">
        <h1
          className="font-orbitron uppercase text-base sm:text-xl md:text-2xl font-bold text-center text-cyan-400 tracking-widest
                     [text-shadow:0_0_2px_#0ff,0_0_2px_#0ff] mb-2"
        >
          Users
        </h1>
        <UsersCard  />
      </div>
    </div>
  );
};

export default Users;
