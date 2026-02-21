import { fetchWithTimeout } from "./fetchWithTimeout";
export { FetchTimeoutError } from "./fetchWithTimeout";

const API_KEY = import.meta.env.VITE_API_KEY;
const NASA_API = import.meta.env.VITE_NASA_API;
const NASA_IMAGES = import.meta.env.VITE_NASA_IMAGES;

export const getPictureOfTheDayRequest = async (timeoutMs: number) => {
  const res = await fetchWithTimeout(`${NASA_API}${API_KEY}`, {}, timeoutMs);
  const data = await res.json();

  return { ok: res.ok, status: res.status, data };
};

export const searchNasaImagesRequest = async (search: string) => {
  const res = await fetchWithTimeout(`${NASA_IMAGES}${search}`);
  const data = await res.json();

  return { ok: res.ok, data };
};
