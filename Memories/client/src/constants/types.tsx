export interface PostType {
  _id: string;
  title: string;
  message: string;
  creator: string;
  tags: string[];
  comments: string[];
  selectedFile: string;
  likes: number[];
  createdAt: string;
}

// Define the shape of the reducer state
export interface PostsState {
  isLoading: boolean;
  posts: PostType[];
  post?: PostType | null;
  currentPage?: number;
  numberOfPages?: number;
}

// Initial state
export const initialState: PostsState = {
  isLoading: true,
  posts: [],
  post: null,
};

export interface AuthFormData {
  email: string;
  password: string;
}
