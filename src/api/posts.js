import axios from "axios";

// Nginx가 /api 요청을 Spring Boot로 프록시
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});


export const fetchPosts = () => api.get("");
export const fetchPostById = (id) => api.get(`/${id}`);
export const createPost = (post) => api.post("", post);
export const updatePost = (id, data) => api.put(`/${id}`, data);
export const deletePost = (id) => api.delete(`/${id}`);
export const checkPassword = (id, password) => api.post(`/${id}/check-password`, { password });

