import { useEffect, useState } from "react";
import type { ProfileProps } from "../types/types";
import cosmon from "../../public/avatar/cosmon.png";
import UserFavorites from "./UserFavorites";

const BACK_API = import.meta.env.VITE_BACKEND_API;

const ProfileComponent = ({ id }: ProfileProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BACK_API}/user`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: Number(id),
          }),
        });
        const data = await res.json();

        console.log("RRRRRR=>", data.userProfile);
        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        console.log("NAAAAME", data.userProfile.name);
        console.log("NAAAAME", data.userProfile.email);
        setName(data.userProfile.name);
        setEmail(data.userProfile.email);
        setImage(data.userProfile.image);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);
  return (
    <div className="w-full max-w-8xl mx-auto my-22">
      <div className="flex items-center justify-between gap-12">
        <div className="flex-shrink-0">
          {image ? (
            <img
              className="w-74 h-74 rounded-full border-4 border-cyan-500 shadow-[0_0_10px_#0ff] object-cover"
              src={image}
              alt="Profile avatar"
            />
          ) : (
            <img
              className="w-24 h-24 rounded-full border-4 border-cyan-500 shadow-[0_0_10px_#0ff] object-cover"
              src={cosmon}
              alt="Default avatar"
            />
          )}
        </div>
        <h1
          className="font-orbitron uppercase text-8xl font-bold text-cyan-400 tracking-widest 
                   [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff] text-center flex-1"
        >
          {name}
        </h1>
        <button
          className="font-orbitron uppercase w-65 h-20 rounded-2xl p-3
                   bg-cyan-700 border border-cyan-500 shadow-[0_0_15px_#0ff] 
                   text-white text-center hover:bg-cyan-600 transition"
        >
          Follow
        </button>
      </div>
      <h1
        className="font-orbitron uppercase text-4xl font-bold text-start text-cyan-400 tracking-widest 
                    [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff] py-36"
      >
        Favorites's of {name}:
      </h1>
      <UserFavorites/>
    </div>
  );
};

export default ProfileComponent;
