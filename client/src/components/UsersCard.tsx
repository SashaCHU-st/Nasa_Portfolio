import { useEffect, useState } from "react";
import type { UsersType } from "../types/types";
import PageScroller from "./PageScroller";
import SearchUsers from "./SearchUsers";
import { useNavigate } from "react-router-dom";
import cosmon from "../../public/avatar/cosmon.png";
import Spinner from "./Spinner";

const ITEMS_PER_PAGE = 6;
const BACK_API = import.meta.env.VITE_BACKEND_API;

const UsersCard = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [users, setUsers] = useState<UsersType[]>([]);
  const [allUsers, setAllUsers] = useState<UsersType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const results = await fetch(`${BACK_API}/users`, {
          credentials: "include",
        });
        const data = await results.json();
        setUsers(data.allUsers);
        setAllUsers(data.allUsers);
        setCurrentPage(1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {loading ? (
          <div className="w-full flex justify-center items-center col-span-full h-64">
            <Spinner />
          </div>
        ) : paginatedItems.length > 0 ? (
          paginatedItems.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-between rounded-2xl p-4 sm:p-6 h-[280px] sm:h-[320px]
                 bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] 
                 hover:scale-105 hover:shadow-[0_0_30px_#0ff] transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-700/10 blur-xl"></div>

              <div
                className="font-orbitron uppercase w-24 h-24 sm:w-36 sm:h-36 rounded-full
                   bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center
                   text-lg sm:text-xl font-bold shadow-[0_0_5px_#0ff] mb-4 z-10"
              >
                <img
                  src={item.image || cosmon}
                  alt="Profile Preview"
                  className="w-20 h-20 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-cyan-500 shadow-[0_0_10px_#0ff]"
                />
              </div>

              <h2 className="font-orbitron uppercase mb-2 font-bold text-center text-base sm:text-lg text-cyan-300 z-10">
                {item.name}
              </h2>

              <button
                className="cursor-pointer font-orbitron uppercase relative border border-cyan-400 bg-cyan-500/20
                   text-cyan-200 font-semibold rounded-xl px-3 sm:px-4 py-2 w-full mt-auto z-10
                   hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_#0ff] transition"
                onClick={() => handleViewProfile(item.id)}
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <h2
            className="font-orbitron uppercase text-2xl sm:text-3xl md:text-4xl font-bold text-center text-cyan-400 tracking-widest
                     [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff] mb-6"
          >
            Not yet Users
          </h2>
        )}
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
