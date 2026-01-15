import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE
    ? `${import.meta.env.VITE_API_BASE}/api`
    : "/api",
  withCredentials: true,
});

export default api;

export const fetchPosts = () => api.get("/inquiries");
export const fetchPostById = (id) => api.get(`/inquiries/${id}`);
export const createPost = (data) => api.post("/inquiries", data);
export const updatePost = (id, data) => api.put(`/inquiries/${id}`, data);
export const deletePost = (id) => api.delete(`/inquiries/${id}`);
export const upsertReply = (id, body) => api.put(`/inquiries/${id}/reply`, body);