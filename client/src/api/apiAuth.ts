import { fetchWithTimeout } from "./fetchWithTimeout";
const BACK_API = import.meta.env.VITE_BACKEND_API;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export const loginRequest = async (payload: LoginPayload) => {
  const res = await fetchWithTimeout(`${BACK_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return { ok: res.ok, data };
};

export const signUpRequest = async (payload: SignUpPayload) => {
  const res = await fetchWithTimeout(`${BACK_API}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return { ok: res.ok, data };
};
