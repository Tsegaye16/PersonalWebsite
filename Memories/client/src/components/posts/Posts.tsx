import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import Post from "./post/post";
import useStyle from "./style";
import { PostType } from "../../types/types";

// Define the shape of the Redux state
interface RootState {
  posts: PostType[];
}
interface FormProps {
  //currentId: string | null;
  setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Posts: React.FC<FormProps> = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector(
    (state: RootState) => state.posts
  ) as any;

  const classes = useStyle();
  if (!posts.length && !isLoading) return <p>No posts yet</p>;
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post: PostType) => (
        <Grid item key={post._id} xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
