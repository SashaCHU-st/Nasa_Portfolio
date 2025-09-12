import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { ProfileProps } from "../types/types";
import { useEffect, useState } from "react";

const BACK_API = import.meta.env.VITE_BACKEND_API;
const Follow = ({id}:ProfileProps) => {
    const [alreadySubs, setAlreadySubs] = useState(false)
    const navigate = useNavigate();
    const { isAuthorized } = useAuth();
    const [message, setMessage] = useState("")

    useEffect (() =>
    {
        const checkSub = async () =>
        {
            const res = await fetch(`${BACK_API}/getMySubscribe`, {
                credentials:"include"
            })
            const data = await res.json()
            if(!res.ok)
            {
                throw new Error (data.message || "Something went wrong")
            }
            for (let i = 0; i < data.mySubscrib.length; i++)
            {
                if(data.mySubscrib[i].id === id)
                {
                    // console.log(data.mySubscrib[i].id)
                    setAlreadySubs(true)
                }
            }
        }
        checkSub()
    }, [])
      const handleFollowButton =async (id:number) =>
  {
    if(!isAuthorized)
    {
      navigate("/auth")
      return
    }

    try
    {
      const res  = await fetch(`${BACK_API}/subscribe`,
        {
          method:"POST",
          headers:{"Content-type":"application/json"},
          credentials:"include",
          body:JSON.stringify({
            follow_id: Number(id )
          })
        }
      )
      const data = await res.json()

      // console.log("KUKU=>", data.message)
            setMessage(data.message)

      if(!res.ok)
      {
        throw new Error (data.message || "Something went wrong")
      }
      setAlreadySubs(true)
    }catch (err: any) {
        console.error(err);
      }
    
  }

const handleUnFollowButton =async (id:number) =>
  {
    try
    {
      const res  = await fetch(`${BACK_API}/unsubscribe`,
        {
          method:"DELETE",
          headers:{"Content-type":"application/json"},
          credentials:"include",
          body:JSON.stringify({
            follow_id: Number(id )
          })
        }
      )
      const data = await res.json()

      // console.log("KUKU=>", data.message)
      setMessage(data.message)

      if(!res.ok)
      {
        throw new Error (data.message || "Something went wrong")
      }
      setAlreadySubs(false)
    }catch (err: any) {
        console.error(err);
      }
    
  }
  return (
    <div>
          {message ? (
        <h2
          className="font-orbitron uppercase text-m sm:text-m md:text-m font-bold text-white tracking-widest
         [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff] mb-2 text-center"
        >
          {message}
        </h2>
      ) : null}
      {
                !alreadySubs ?
             (
                 <button
                 onClick={()=>handleFollowButton(id)}
                   className="font-orbitron uppercase w-40 sm:w-65 h-12 sm:h-20 rounded-2xl p-3
                             bg-cyan-700 border border-cyan-500 shadow-[0_0_15px_#0ff] 
                             text-white text-center hover:bg-cyan-600 transition mt-4 sm:mt-0"
                 >
                    <h2>
                        Follow
                    </h2>
                
        </button>
                ) : (
                 <button
                 onClick={()=>handleUnFollowButton(id)}
                   className="font-orbitron uppercase w-40 sm:w-65 h-12 sm:h-20 rounded-2xl p-3
                             bg-cyan-700 border border-cyan-500 shadow-[0_0_15px_#0ff] 
                             text-white text-center hover:bg-cyan-600 transition mt-4 sm:mt-0"
                 >
                    <h2>
                        UnFollow
                    </h2>
                
        </button>
                )
            }
          
    </div>
  )
}

export default Follow