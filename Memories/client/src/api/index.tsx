import axios from "axios";
import { PostType, AuthFormData } from "../constants/types";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://memory-89zg.onrender.com",
});

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    const { token } = JSON.parse(profile);
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchPost = (id: any) => API.get(`/posts/${id}`);

export const fetchPosts = (page: any) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery: any) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost: PostType) => API.post("/posts", newPost);
export const likePost = (id: string) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id: string, updatedPost: PostType) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: string) => API.delete(`/posts/${id}`);

export const signIn = async (formData: AuthFormData) =>
  API.post("/user/signin", formData);

export const signUp = async (formData: AuthFormData) =>
  API.post("/user/signup", formData);

export const comment = (value: any, id: any) =>
  API.post(`/posts/${id}/commentPost`, { value });
