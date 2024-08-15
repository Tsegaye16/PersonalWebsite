import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    const { token } = JSON.parse(profile);
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

interface Post {
  _id?: string;
  title: string;
  message: string;
  creator: string;
  tags?: string[];
  selectedFile?: string;
  likeCount?: number;
}

interface AuthFormData {
  email: string;
  password: string;
}

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost: Post) => API.post("/posts", newPost);
export const likePost = (id: string) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id: string, updatedPost: Post) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: string) => API.delete(`/posts/${id}`);

export const signIn = async (formData: AuthFormData) => {
  try {
    const response = await API.post("/user/signin", formData);
    return response.data;
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  }
};

export const signUp = async (formData: AuthFormData) => {
  try {
    const response = await API.post("/user/signup", formData);
    return response.data;
  } catch (error) {
    console.error("Sign-up error:", error);
    throw error;
  }
};
