import api from "./posts";

export const getMe = () => api.get("/auth/me");
export const logout = () => api.post("/auth/logout");