import { useState } from "react";
import Moon from "../backgrounds/Moon"
import UsersCard from "../components/UsersCard"
import type { Users } from '../types/types';

const Users = () => {
  const [searchUsers, setSeachUsers] = useState<string>("")

  // const searchUser = (text:string) =>
  // {
  //   setSeachUsers(text);
  //   const filtered = user
  // }

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
        {/* <form onSubmit={searchUser} className="flex justify-center my-6">
          <input type="text"
          className="font-orbitron uppercase relative flex flex-col items-center justify-center content-center w-96 rounded-2xl p-6
                         bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white"
                         placeholder="...Search"
          value={searchUsers}
          onChange={(e)=>e.target.value} />
        <button onClick={searchUser(searchUsers)}>Search</button>
        </form> */}
        <UsersCard/>
      </div>
    </div>
  );
};

export default Users;