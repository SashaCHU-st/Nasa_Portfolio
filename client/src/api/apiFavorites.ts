import { fetchWithTimeout } from "./fetchWithTimeout";

const BACK_API = import.meta.env.VITE_BACKEND_API;

export const getMyFavoritesRequest = async () => {
  const res = await fetchWithTimeout(`${BACK_API}/myFavorites`, {
    credentials: "include",
  });
  const data = await res.json();

  return { ok: res.ok, data };
};

export const deleteFavoriteRequest = async (nasaId: string) => {
  const res = await fetchWithTimeout(`${BACK_API}/deleteFavorites`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      nasa_id: nasaId,
    }),
  });
  const data = await res.json();

  return { ok: res.ok, data };
};

export const getUserFavoritesRequest = async (id: number) => {
  const res = await fetchWithTimeout(`${BACK_API}/userFavorites`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: Number(id),
    }),
  });
  const data = await res.json();

  return { ok: res.ok, data };
};
