import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import { AppDispatch } from "src";
import useStyle from "./styles";
import { getPost, getPostsBySearch } from "../../actions/posts";
import { PostType } from "../../constants/types";
import CommentSection from "./commentSection";

const PostDetails: React.FC = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { post, posts, isLoading } = useSelector((state: any) => state.posts);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post?.tags) {
      dispatch(getPostsBySearch({ search: "none", tags: post.tags.join(",") }));
    }
  }, [dispatch, post]);

  if (!post) return null;

  const openPost = (_id: any) => navigate(`/posts/${_id}`);
  const recommendedPosts = posts.filter(({ _id }: any) => _id !== post._id);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag: any) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <CommentSection post={post} />
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://storage.googleapis.com/regalflowers-cdn/mobile-img-2023-11-Regalflowers-scaled.webp"
            }
            alt={post.title}
          />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({
                title,
                name,
                message,
                likes,
                selectedFile,
                _id,
              }: PostType) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img
                    src={
                      selectedFile ||
                      "https://storage.googleapis.com/regalflowers-cdn/mobile-img-2023-11-Regalflowers-scaled.webp"
                    }
                    width="200px"
                    alt={title}
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
