import axios from "axios";

// Nginx가 /api 요청을 Spring Boot로 프록시
const API_BASE_URL = "http://localhost:8080/api/inquiries";

const api = axios.create({
  baseURL: API_BASE_URL
});

export const fetchPosts = () => api.get("");
export const fetchPostById = (id) => api.get(`/${id}`);
export const createPost = (post) => api.post("", post);
export const updatePost = (id, data) => api.put(`/${id}`, data);
export const deletePost = (id) => api.delete(`/${id}`);
export const checkPassword = (id, password) => api.post(`/${id}/check-password`, { password });

