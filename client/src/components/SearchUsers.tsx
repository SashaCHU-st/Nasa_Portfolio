import React, { useState } from "react";
import type { SearchUserProps } from "../types/types";

const SearchUsers = ({ setUsers, allUsers }: SearchUserProps) => {
  const [searchUsers, setSearchUsers] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchUsers(text);

    if (text === "") {
      setUsers(allUsers);
    } else {
      const filtered = allUsers.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setUsers(filtered);
    }
  };
  return (
    <div>
      <form className="flex flex-col sm:flex-row justify-center items-center my-6 gap-4" >
        <input
          type="text"
          className="font-orbitron uppercase w-full max-w-sm sm:max-w-[384px] rounded-2xl p-3
               bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center"
          placeholder="...Search users"
          value={searchUsers}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="cursor-pointer font-orbitron uppercase w-full sm:w-32 rounded-2xl p-3
               bg-cyan-700 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchUsers;
