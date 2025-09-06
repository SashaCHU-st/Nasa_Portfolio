import type { MyFav } from "../types/types";

const BACK_API = import.meta.env.VITE_BACKEND_API;

export const addToMyFavorite = async ({
  nasa_id,
  title,
  description,
  image,
}: MyFav) => {
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
    console.log(data.message);
    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data.message;
  } catch (error) {
    console.error(error);
    return error instanceof Error ? error.message : "Что-то пошло не так";
    // throw error;
  }
};
