import type { MyFav } from "../types/types";

const BACK_API = import.meta.env.VITE_BACKEND_API;

export const addToMyFavorite = async ({ nasa_id, title, description, image } : MyFav ) => {
  try {
    const res = await fetch(`${BACK_API}/addFavorites`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        nasa_id,
        title,
        description,
        image,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    console.log("YYY=>", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
