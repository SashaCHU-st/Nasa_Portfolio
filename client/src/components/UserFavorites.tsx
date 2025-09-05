import { useEffect } from "react";
import type { ProfileProps } from "../types/types";
import { useState } from "react";
import type { MyFav } from "../types/types";
import PageScroller from "./PageScroller";
import cosmon from "../../public/avatar/cosmon.png";
import { useNavigate } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToMyFavorite } from "../api/api";

const BACK_API = import.meta.env.VITE_BACKEND_API;
const ITEMS_PER_PAGE = 6;
const UserFavorites = ({ id }: ProfileProps) => {
  const [fav, setFav] = useState<MyFav[]>([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const handleUserFavorites = async () => {
      try {
        const res = await fetch(`${BACK_API}/userFavorites`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: Number(id),
          }),
        });
        const data = await res.json();
        console.log("UUUU=>", data.userFav);
        setFav(data.userFav);
      } catch (err: any) {
        console.error(err);
      }
    };
    handleUserFavorites();
  }, []);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = fav.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(fav.length / ITEMS_PER_PAGE);

  const handleMoreDetails = (item: any) => {
    navigate(`/moreDetails/${item.nasa_id}`, {
      state: {
        title: item.title,
        description: item.description,
        image: item.image,
      },
    });
  };
  return (
    <div>
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
              className="font-orbitron uppercase w-36 h-36  bg-gradient-to-tr from-cyan-500 to-purple-600 
                              flex items-center justify-center text-xl font-bold 
                              shadow-[0_0_5px_#0ff] mb-4 z-10"
            >
              {!item.image ? (
                <img
                  src={cosmon}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover  border-4 border-cyan-500 shadow-[0_0_10px_#0ff] my-4"
                />
              ) : (
                <img
                  src={item.image}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover  border-4 border-cyan-500 shadow-[0_0_10px_#0ff] my-4"
                />
              )}
            </div>
            <h2 className="font-orbitron uppercase mb-2 font-bold text-center text-lg text-cyan-300 z-10">
              {item.title}
            </h2>
            <div className="flex justify-between items-center w-full">
              <button
                className="font-orbitron uppercase relative border border-cyan-400 bg-cyan-500/20 text-cyan-200 font-semibold 
                                 rounded-xl px-4 py-3 mt-auto w-5/6 z-10 
                                 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_#0ff] transition"
                onClick={() => handleMoreDetails(item)}
              >
                description
              </button>
              <button
                onClick={() =>
                  addToMyFavorite({
                    nasa_id: item.nasa_id,
                    title: item.title,
                    description: item.description,
                    image: item.image,
                  })
                }
                className="font-orbitron uppercase w-20 p-3 rounded-2xl
                          shadow-[0_0_15px_#0ff] text-white text-center z-20
                          hover:scale-105 hover:shadow-[0_0_30px_#0ff] transition-all duration-300"
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-xl md:text-2xl"
                />
              </button>
            </div>
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

export default UserFavorites;
