import { api } from "../utils/APIRoutes";

export const registerUser = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  // save jwt token in local storage
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

export const getProfile = async () => {
  const res = await api.get("/auth/profile");
  return res.data;
};
