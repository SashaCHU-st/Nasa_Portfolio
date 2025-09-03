import Moon from "../backgrounds/Moon"
import UsersCard from "../components/UsersCard"
import type { Users } from '../types/types';

const Users = () => {


  return (
    <div className="relative min-h-screen w-full flex justify-center items-start overflow-x-hidden">
      <Moon />
      <div className="absolute top-1/2 transform -translate-y-1/2 w-11/12 max-w-[95%] px-4">
        <h1
          className="font-orbitron uppercase text-4xl font-bold text-center text-cyan-400 tracking-widest 
                    [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff]"
        >
          Users
        </h1>
        <UsersCard/>
      </div>
    </div>
  );
};

export default Users;