import { fetchWithTimeout } from "./fetchWithTimeout";

const BACK_API = import.meta.env.VITE_BACKEND_API;

export const getUserProfileRequest = async (id: number) => {
  const res = await fetchWithTimeout(`${BACK_API}/user`, {
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

interface EditProfilePayload {
  image: string | null;
  password: string;
  name: string;
}

export const editProfileRequest = async ({
  image,
  password,
  name,
}: EditProfilePayload) => {
  const res = await fetchWithTimeout(`${BACK_API}/editProfile`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      image,
      password,
      name,
    }),
  });
  const data = await res.json();

  return { ok: res.ok, data };
};
