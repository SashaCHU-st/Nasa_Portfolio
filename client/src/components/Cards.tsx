import type { CardProps } from "../types/types";
import PageScroller from "./PageScroller";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { addToMyFavorite } from "../api/api";
import { useAuth } from "../context/AuthContext";
import type { MyFav } from "../types/types";
import { useState } from "react";

const Cards = ({
  search,
  searchPressed,
  loading,
  paginatedItems,
  pages,
}: CardProps) => {
  const navigate = useNavigate();
  const { isAuthorized } = useAuth();
  const [message, setMessage] = useState<string>("");

  const handleMoreDetails = (item: any) => {
    navigate(`/moreDetails/${item.data[0].nasa_id}`, {
      state: {
        title: item.data[0].title,
        description: item.data[0].description,
        image: item.links?.[0]?.href,
      },
    });
  };

  const handleFavoriteClick = async (item: (typeof paginatedItems)[number]) => {
    if (!isAuthorized) {
      navigate("/auth");
      return;
    }

    const favItem: MyFav = {
      nasa_id: item.data[0].nasa_id,
      title: item.data[0].title,
      description: item.data[0].description,
      image: item.links?.[0]?.href,
    };

    const message = await addToMyFavorite(favItem);
    setMessage(message);
  };

  return (
    <div>
      {message && (
        <h2 className="font-orbitron uppercase text-xl sm:text-base font-bold text-white tracking-widest
         [text-shadow:0_0_3px_#0ff,0_0_3px_#0ff] mb-2 text-center">
          {message}
        </h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
        {loading && searchPressed ? (
          <h2 className="font-orbitron uppercase text-xl sm:text-2xl md:text-3xl font-bold text-center text-cyan-400 tracking-widest
                     [text-shadow:0_0_3px_#0ff,0_0_3px_#0ff] mb-4">
            ...Loading
          </h2>
        ) : search !== "" && searchPressed ? (
          paginatedItems.length > 0 ? (
            paginatedItems.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center justify-between rounded-xl p-4 h-[340px] 
                         bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_10px_#0ff] 
                         hover:scale-105 hover:shadow-[0_0_20px_#0ff] transition-all duration-300"
              >
                <h2 className="mb-1 font-bold text-center text-xs sm:text-sm md:text-base text-white">
                  {item.data[0].title}
                </h2>
                {item.links?.[0]?.href && (
                  <div className="w-full h-48 mb-2">
                    <img
                      src={item.links[0].href}
                      alt={item.data[0].title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                )}
                <div className="flex justify-between items-center w-full gap-2">
                  <button
                    onClick={() => handleMoreDetails(item)}
                    className="font-orbitron uppercase flex-1 min-w-[100px] rounded-xl p-2
        bg-[#0d1b2a]/80 border bg-cyan-700 border-cyan-500 
        shadow-[0_0_10px_#0ff] text-white text-center hover:scale-105 hover:shadow-[0_0_20px_#0ff] transition-all duration-300"
                  >
                    More details
                  </button>

                  <button
                    onClick={() => handleFavoriteClick(item)}
                    className="font-orbitron uppercase flex-none w-10 sm:w-12 md:w-16 p-2 rounded-xl
        shadow-[0_0_10px_#0ff] text-white text-center hover:scale-105 hover:shadow-[0_0_20px_#0ff] transition-all duration-300"
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-base sm:text-lg md:text-xl"
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center col-span-full">
              <h2 className="font-orbitron uppercase text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 tracking-widest
               [text-shadow:0_0_3px_#0ff,0_0_3px_#0ff] mb-4 text-center">
                Nothing found yet, change your search
              </h2>
            </div>
          )
        ) : null}

        {search === "" && searchPressed && (
          <div className="flex justify-center col-span-full">
            <h2 className="font-orbitron uppercase text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 tracking-widest
               [text-shadow:0_0_3px_#0ff,0_0_3px_#0ff] mb-4 text-center">
              Cannot be empty request
            </h2>
          </div>
        )}
      </div>

      {searchPressed && <PageScroller {...pages} />}
    </div>
  );
};

export default Cards;
