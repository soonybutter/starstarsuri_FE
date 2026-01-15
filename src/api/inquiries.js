import client from "./client";

// inquiries 리소스는 항상 "/inquiries"를 붙여서 호출
export const fetchPosts = () => client.get("/inquiries");
export const fetchPostById = (id) => client.get(`/inquiries/${id}`);
export const createPost = (post) => client.post("/inquiries", post);
export const updatePost = (id, data) => client.put(`/inquiries/${id}`, data);
export const deletePost = (id) => client.delete(`/inquiries/${id}`);
export const checkPassword = (id, password) =>
  client.post(`/inquiries/${id}/check-password`, { password });