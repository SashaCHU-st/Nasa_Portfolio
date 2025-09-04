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
      <div className="flex justify-center my-6 gap-2">
        <input
          type="text"
          className="font-orbitron uppercase w-96 rounded-2xl p-4
                    bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center"
          placeholder="...Search"
          value={searchUsers}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="font-orbitron uppercase w-32 rounded-2xl p-4
                    bg-[#0d1b2a]/80 border bg-cyan-700 border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchUsers;
