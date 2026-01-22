import { useEffect } from "react";
import type { ProfileProps, MyFav } from "../../types/types";
import { useState } from "react";
import type {} from "../../types/types";
import PageScroller from "../common/PageScroller";
import cosmon from "../../../public/avatar/cosmon.png";
import { useNavigate } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToMyFavorite } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { paginate } from "../../utils/paginatedItems";
import Spinner from "../common/Spinner";
import NotYetItems from "../common/NotYetItems";
const BACK_API = import.meta.env.VITE_BACKEND_API;

const UserFavorites = ({ id }: ProfileProps) => {
  const { isAuthorized } = useAuth();
  const [fav, setFav] = useState<MyFav[]>([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleUserFavorites = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BACK_API}/userFavorites`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: Number(id),
          }),
        });
        const data = await res.json();
        // console.log("UUUU=>", data.userFav);
        setLoading(false);
        setFav(data.userFav);
      } catch (err) {
        console.error(err);
      }
    };
    handleUserFavorites();
  }, [id]);
  const { items, totalPages } = paginate(fav, currentPage);

  const handleMoreDetails = (item: MyFav) => {
    navigate(`/moreDetails/${item.nasa_id}`, {
      state: {
        title: item.title,
        description: item.description,
        image: item.image,
      },
    });
  };

  const handleFavoriteClick = async (e: React.MouseEvent, item: MyFav) => {
    e.stopPropagation();
    if (!isAuthorized) {
      navigate("/auth");
      return;
    }

    const message = await addToMyFavorite(item);
    setMessage(message);
  };

  return (
    <div>
      {loading ? (
        <div className="w-full h-[320px] flex items-center justify-center">
          <Spinner />
        </div>
      ) : fav.length === 0 ? (
        <div className="flex items-center justify-center h-[320px] mt-4">
          <NotYetItems item="Not yet favorites" />
        </div>
      ) : (
        <>
          {message && (
            <h2
              className="font-orbitron uppercase text-2xl sm:text-m md:text-m font-bold text-white tracking-widest
             [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff] mb-2 text-center"
            >
              {message}
            </h2>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mt-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer relative flex flex-col items-center justify-between rounded-2xl p-6 h-[320px] 
                           bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] 
                           hover:scale-105 hover:shadow-[0_0_30px_#0ff] transition-all duration-300"
                onClick={() => handleMoreDetails(item)}
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
                <h2 className="font-orbitron uppercase mb-2 font-bold text-center text-sm sm:text-sm md:text-sm text-cyan-300 z-10">
                  {item.title}
                </h2>

                <div className="flex justify-between items-center w-full">
                  <button
                    className="cursor-pointer font-orbitron uppercase relative border border-cyan-400 
                    bg-cyan-500/20 text-cyan-200 font-semibold 
                   rounded-xl  py-1 sm:py-2 mt-auto w-4/6 z-10 
                   text-sm sm:text-sm md:text-sm"
                    // onClick={() => handleMoreDetails(item)}
                  >
                    details
                  </button>
                  <button
                    onClick={(e) => handleFavoriteClick(e, item)}
                    className="cursor-pointer font-orbitron uppercase w-2/7 sm:w-2/7 p-1 sm:p-1 rounded-2xl
                   shadow-[0_0_15px_#0ff] text-white text-center z-20
                   hover:scale-105 hover:shadow-[0_0_30px_#0ff] transition-all duration-300"
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-lg sm:text-xl md:text-2xl"
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
        </>
      )}
    </div>
  );
};

export default UserFavorites;
