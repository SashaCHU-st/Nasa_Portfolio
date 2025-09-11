import { useEffect, useState } from "react";
import type { MyFav } from "../types/types";
import cosmon from "../../public/avatar/cosmon.png";
import PageScroller from "./PageScroller";
import { useNavigate } from "react-router-dom";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "./Spinner";
import { paginate } from "../utils/paginatedItems";

const BACK_API = import.meta.env.VITE_BACKEND_API;
const ITEMS_PER_PAGE = 6;

const MyFavorites = () => {
  const [myFav, setMyFav] = useState<MyFav[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchFav = async () => {
      try {
        const res = await fetch(`${BACK_API}/myFavorites`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        setMyFav(data.fav);
        setCurrentPage(1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFav();
  }, []);
const { items, totalPages } = paginate(myFav, currentPage);
  const handleMoreDetails = (item: any) => {
    navigate(`/moreDetails/${item.nasa_id}`, {
      state: {
        title: item.title,
        description: item.description,
        image: item.image,
      },
    });
  };

  const handleDeleteFav = async (id: string) => {
    const res = await fetch(`${BACK_API}/deleteFavorites`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        nasa_id: id,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    setMyFav((prev) => prev.filter((item) => item.nasa_id !== id));

    const newTotalPages = Math.ceil((myFav.length - 1) / ITEMS_PER_PAGE);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages > 0 ? newTotalPages : 1);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {loading ? (
          <div className="w-full flex justify-center items-center col-span-full h-64">
            <Spinner />
          </div>
        ) : myFav && items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-between rounded-2xl p-6 w-full h-[340px] sm:h-[360px] 
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
              <h2 className="font-orbitron uppercase mb-2 font-bold text-center  text-sm sm:text-sm md:text-sm text-cyan-300 z-10">
                {item.title}
              </h2>
              <div className="flex justify-between items-center w-full">
                <button
                  className="cursor-pointer font-orbitron uppercase relative border border-cyan-400 bg-cyan-500/20 text-cyan-200 font-semibold 
                                     rounded-xl px-2 py-3 mt-auto w-4/7 z-10  text-sm sm:text-sm md:text-sm
                                     hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_#0ff] transition"
                  onClick={() => handleMoreDetails(item)}
                >
                  details
                </button>

                <button
                  onClick={() => handleDeleteFav(item.nasa_id)}
                  className="cursor-pointer font-orbitron uppercase w-20 p-2 rounded-2xl
                                            shadow-[0_0_15px_#0ff] text-white text-center z-20
                                            hover:scale-105 hover:shadow-[0_0_30px_#0ff] transition-all duration-300"
                >
                  <FontAwesomeIcon
                    icon={faHeartBroken}
                    className="text-xl md:text-2xl"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center col-span-full">
            <h2
              className="font-orbitron uppercase text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 tracking-widest
               [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff] mb-6 text-center"
            >
              Nothing in Favorites
            </h2>
          </div>
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

export default MyFavorites;
