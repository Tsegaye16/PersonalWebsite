export interface PostType {
  _id: string;
  title: string;
  message: string;
  creator: string;
  tags: string[];
  selectedFile: string;
  likes: number[];
  createdAt: string;
}
