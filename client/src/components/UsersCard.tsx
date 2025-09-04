import { useEffect, useState } from "react";
import type { UsersType } from "../types/types";
import PageScroller from "./PageScroller";
import SearchUsers from "./SearchUsers";
import { useNavigate } from "react-router-dom";
import cosmon from "../../public/avatar/cosmon.png";


const ITEMS_PER_PAGE = 6;

const BACK_API = import.meta.env.VITE_BACKEND_API;

const UsersCard = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [users, setUsers] = useState<UsersType[]>([]);
  const [allUsers, setAllUsers] = useState<UsersType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const results = await fetch(`${BACK_API}/users`, {
          credentials: "include",
        });
        const data = await results.json();
        console.log("YYYY=>", data.allUsers);
        setUsers(data.allUsers);
        setAllUsers(data.allUsers);
        setCurrentPage(1);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  const handleViewProfile = (id: number) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div>
      <SearchUsers setUsers={setUsers} allUsers={allUsers} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-12">
        {paginatedItems.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center justify-between rounded-2xl p-6 h-[320px] 
                         bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] 
                         hover:scale-105 hover:shadow-[0_0_30px_#0ff] transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-700/10 blur-xl"></div>
            <div
              className="font-orbitron uppercase w-36 h-36 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 
                              flex items-center justify-center text-xl font-bold 
                              shadow-[0_0_5px_#0ff] mb-4 z-10"
            >
              {!item.image ? 
              (
                <img
              src={cosmon}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full border-4 border-cyan-500 shadow-[0_0_10px_#0ff] my-4"
            />
              ) : (
               <img
              src={item.image}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full border-4 border-cyan-500 shadow-[0_0_10px_#0ff] my-4"
            />
              )}
            </div>
            <h2 className="font-orbitron uppercase mb-2 font-bold text-center text-lg text-cyan-300 z-10">
              {item.name}
            </h2>
            <h2 className="font-orbitron uppercase mb-4 font-medium text-center text-sm text-gray-300 z-10">
              {item.email}
            </h2>
            <button
              className="font-orbitron uppercase relative border border-cyan-400 bg-cyan-500/20 text-cyan-200 font-semibold 
                                 rounded-xl px-4 py-2 mt-auto w-full z-10 
                                 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_#0ff] transition"
              onClick={() => handleViewProfile(item.id)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
      <PageScroller
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UsersCard;
