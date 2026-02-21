import { fetchWithTimeout } from "./fetchWithTimeout";

const BACK_API = import.meta.env.VITE_BACKEND_API;

export const getUsersRequest = async () => {
  const res = await fetchWithTimeout(`${BACK_API}/users`, {
    credentials: "include",
  });
  const data = await res.json();

  return { ok: res.ok, data };
};

export const getMySubscribeRequest = async () => {
  const res = await fetchWithTimeout(`${BACK_API}/getMySubscribe`, {
    credentials: "include",
  });
  const data = await res.json();

  return { ok: res.ok, data };
};

export const getMyFollowersRequest = async () => {
  const res = await fetchWithTimeout(`${BACK_API}/getMyFollowers`, {
    credentials: "include",
  });
  const data = await res.json();

  return { ok: res.ok, data };
};

export const subscribeRequest = async (id: number) => {
  const res = await fetchWithTimeout(`${BACK_API}/subscribe`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      follow_id: Number(id),
    }),
  });
  const data = await res.json();

  return { ok: res.ok, data };
};

export const unsubscribeRequest = async (id: number) => {
  const res = await fetchWithTimeout(`${BACK_API}/unsubscribe`, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      follow_id: Number(id),
    }),
  });
  const data = await res.json();

  return { ok: res.ok, data };
};
