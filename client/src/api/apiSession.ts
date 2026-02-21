import { fetchWithTimeout } from "./fetchWithTimeout";

const BACK_API = import.meta.env.VITE_BACKEND_API;

export const logoutRequest = async () => {
  await fetchWithTimeout(`${BACK_API}/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const checkAuthRequest = async () => {
  const res = await fetchWithTimeout(`${BACK_API}/me`, {
    credentials: "include",
  });

  return res.ok;
};

export const getMeRequest = async () => {
  const res = await fetchWithTimeout(`${BACK_API}/me`, {
    credentials: "include",
  });
  const data = await res.json();

  return { ok: res.ok, data };
};
