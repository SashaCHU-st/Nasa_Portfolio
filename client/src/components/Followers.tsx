import ViewProfileButton from "./ViewProfileButton"
import cosmon from "../../public/avatar/cosmon.png";
import type{ FollowersProps } from "../types/types";

const Followers = ({index, item}:FollowersProps) => {
  return (
    <div>
        <div key={index}
                    className="relative flex flex-col items-center justify-between rounded-2xl p-4 sm:p-6 h-[280px] sm:h-[320px]
                        bg-[#0d1b2a]/80 border border-cyan-500 shadow-[0_0_15px_#0ff] 
                        hover:scale-105 hover:shadow-[0_0_30px_#0ff] transition-all duration-300">

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
              <ViewProfileButton id={item.id}/>
                </div>
    </div>
  )
}

export default Followers