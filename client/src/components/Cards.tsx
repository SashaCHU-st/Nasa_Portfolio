import type { CardProps } from "../types/types";
import PageScroller from "./PageScroller";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { addToMyFavorite } from "../api/api";
import { useAuth } from "../context/AuthContext";
import type { MyFav } from "../types/types";

const Cards = ({ paginatedItems, pages }: CardProps) => {
  const navigate = useNavigate();
  const { isAuthorized } = useAuth();

  const handleMoreDetails = (item: any) => {
    navigate(`/moreDetails/${item.data[0].nasa_id}`, {
      state: {
        title: item.data[0].title,
        description: item.data[0].description,
        image: item.links?.[0]?.href,
      },
    });
  };

  const handleFavoriteClick = (item: (typeof paginatedItems)[number]) => {
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

    addToMyFavorite(favItem);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-12">
        {paginatedItems.map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center justify-between rounded-2xl p-6 h-[420px] 
                         bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] 
                         hover:scale-105 hover:shadow-[0_0_30px_#0ff] transition-all duration-300"
          >
            <h2 className="mb-2 font-bold text-center text-sm sm:text-base md:text-lg text-white">
              {item.data[0].title}
            </h2>
            {item.links?.[0]?.href && (
              <div className="w-full h-60 mb-2">
                <img
                  src={item.links[0].href}
                  alt={item.data[0].title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            )}
            <div className="flex justify-between items-center w-full">
              <button
                onClick={() => handleMoreDetails(item)}
                className="font-orbitron uppercase w-42 rounded-2xl p-3
     bg-[#0d1b2a]/80 border bg-cyan-700 border-cyan-500 
     shadow-[0_0_15px_#0ff] text-white text-center hover:scale-105 hover:shadow-[0_0_30px_#0ff] transition-all duration-300"
              >
                More details
              </button>

              <button
                onClick={() => handleFavoriteClick(item)}
                className="font-orbitron uppercase w-20 p-3 rounded-2xl
     shadow-[0_0_15px_#0ff] text-white text-center hover:scale-105 hover:shadow-[0_0_30px_#0ff] transition-all duration-300"
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
      <PageScroller {...pages} />
    </div>
  );
};

export default Cards;
