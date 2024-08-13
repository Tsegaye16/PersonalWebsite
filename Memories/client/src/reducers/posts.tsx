import { PostType } from "../types/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (posts: PostType[] = [], action: any) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "DELETE":
      return posts.filter((post) => post._id !== action.payload);
    case "CREATE":
      return [...posts, action.payload];
    case "UPDATE":
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return posts;
  }
};
