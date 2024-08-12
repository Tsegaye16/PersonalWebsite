import React from "react";
import { useSelector, UseSelector } from "react-redux";
import Post from "./post/post";
import useStyle from "./style";

const Posts: React.FC = () => {
  const posts = useSelector((state: any) => state.posts);
  const classes = useStyle();
  console.log(posts);
  return (
    <>
      <h1>POSTS</h1>
      <Post />
      <Post />
    </>
  );
};

export default Posts;
