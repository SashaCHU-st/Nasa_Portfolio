import { useEffect, useState } from "react"
import type{ ProfileProps } from "../types/types"

const BACK_API = import.meta.env.VITE_BACKEND_API;

const ProfileComponent = ({id}:ProfileProps) => {


const [name, setName] = useState<string>("")
const [email, setEmail] = useState<string>("")


useEffect(() =>
{
    const fetchProfile = async () =>
    {
        try
        {
            const res = await fetch(`${BACK_API}/user`,
            {
                method:"POST",
                credentials:"include",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    id:Number(id)
                })
            }    
        )
        const data =await  res.json()
        
        console.log("RRRRRR=>", data.userProfile)
        if(!res.ok)
        {
            throw new Error (data.message || "Something went wrong")
        }
        
        console.log("NAAAAME", data.userProfile.name)
        console.log("NAAAAME", data.userProfile.email)
        setName(data.userProfile.name)
        setEmail(data.userProfile.email)
        }    catch (error) {
            console.error(error);
        }
        }
        fetchProfile()
},[])
  return (
    <div>         
        {/* <h1>User Profile</h1> */}
        <h1 className="font-orbitron uppercase text-4xl font-bold text-center text-cyan-400 tracking-widest 
                    [text-shadow:0_0_5px_#0ff,0_0_5px_#0ff]">{name}</h1>
        {/* <h2>{email}</h2> */}
        {/* <p>User ID: {id}</p> */}
        <div className="flex justify-end my-12">
        <button className="font-orbitron uppercase w-32 rounded-2xl p-4
                    bg-[#0d1b2a]/80 border bg-cyan-700 border-cyan-500 shadow-[0_0_15px_#0ff] text-white text-center">Follow</button>
        </div>
    </div>
  )
}

export default ProfileComponent