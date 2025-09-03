import React, { use, useEffect, useState } from 'react'
import type { Users } from '../types/types';


const BACK_API = import.meta.env.VITE_BACKEND_API;

const UsersCard = () => {
const [users, setUsers] = useState<Users[]>([])

useEffect (() =>
{
    const fetchUsers =  async ()=>
    {
    try
    {
        const results =  await fetch(`${BACK_API}/users`,
        {
            credentials:"include"
        })
        const data = await results.json();
        console.log("YYYY=>", data.allUsers)
        setUsers(data.allUsers)
        }
    catch (error) {
    console.error(error);
    }
    }
    fetchUsers()
},[])
  return (
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
        {users.map((item, index) => (
          <div
            key={index}
            className="text-white border-4 border-gray-500 p-4 flex flex-col items-center rounded-xl w-full h-[400px]"
          >
            <h2 className="mb-2 font-bold text-center text-sm sm:text-base md:text-lg">
              {item.name}
            </h2>
            <h2 className="mb-2 font-bold text-center text-sm sm:text-base md:text-lg">
              {item.email}
            </h2>
           
            <button className="border-2 border-blue-500 bg-blue-500 text-white rounded-xl px-4 py-2 mt-auto w-full">
              View Profile
            </button>
          </div>
        ))}
      </div>
        
    </div>
  )
}

export default UsersCard