import { useNavigate } from "react-router-dom";
import type{ ProfileProps } from "../types/types";

const ViewProfileButton = ({id}:ProfileProps) => {
      const navigate = useNavigate();

  const handleViewProfile = (id: number) => {
    navigate(`/profile/${id}`);
  };
  return (
    <div>              
        <button
                className="cursor-pointer font-orbitron uppercase relative border border-cyan-400 bg-cyan-500/20
                   text-cyan-200 font-semibold rounded-xl px-3 sm:px-4 py-2 w-full mt-auto z-10
                   hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_#0ff] transition"
                onClick={() => handleViewProfile(id)}
              >
                View Profile
        </button>
    </div>
  )
}

export default ViewProfileButton