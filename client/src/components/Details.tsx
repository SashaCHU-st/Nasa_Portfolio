import { useLocation, useParams } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToMyFavorite } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Details = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthorized } = useAuth();
  const [message, setMessage] = useState<string>("");
  const { title, description, image } = location.state || {};

  const handleAddToFavorites = async () => {
    if (!id) return;
    if (!isAuthorized) {
      navigate("/auth");
      return;
    }

    const message = await addToMyFavorite({
      nasa_id: id,
      title,
      description,
      image,
    });

    // console.log("JJJ=>", error);
    setMessage(message);
  };
  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-10 justify-center">
      {message && (
        <h2
          className="font-orbitron uppercase text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 tracking-widest
               [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff] mb-6 text-center"
        >
          {message}
        </h2>
      )}
      <div className="max-w-4xl w-full bg-[#0d1b2a]/90 border border-cyan-500 rounded-2xl shadow-[0_0_25px_#0ff] p-6 flex flex-col items-center">
        <h2 className="font-orbitron uppercase text-white text-2xl md:text-3xl mb-6 text-center">
          {title}
        </h2>

        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full max-w-2xl sm:max-w-xl md:max-w-lg lg:max-w-2xl rounded-xl shadow-lg mb-6 object-cover"
          />
        ) : (
          <p className="text-gray-400 italic mb-6">Image loading...</p>
        )}

        <p className="font-sans text-white text-center max-w-3xl leading-relaxed break-words">
          {description}
        </p>

        <p className="mt-6 text-sm text-gray-400">NASA ID: {id}</p>
        <div className="w-full flex justify-end mb-4">
          <button
            onClick={handleAddToFavorites}
            className="font-orbitron uppercase w-20 p-3 rounded-2xl
 shadow-[0_0_15px_#0ff] text-white text-center hover:scale-105 hover:shadow-[0_0_30px_#0ff] transition-all duration-300"
          >
            <FontAwesomeIcon icon={faHeart} className="text-xl md:text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
