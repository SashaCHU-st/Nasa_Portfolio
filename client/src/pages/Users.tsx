import Moon from "../backgrounds/Moon";
import UsersCard from "../components/UsersCard";

const Users = () => {
  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden bg-black">
      <Moon /> 
      <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10/12 sm:w-8/12 md:w-6/12 max-w-[90%] px-2">
        <h1
          className="font-orbitron uppercase text-sm sm:text-lg md:text-xl font-bold text-center text-cyan-400 tracking-widest
                     [text-shadow:0_0_2px_#0ff,0_0_2px_#0ff] mb-2"
        >
          Users
        </h1>
        <UsersCard />
      </div>
    </div>
  );
};

export default Users;

