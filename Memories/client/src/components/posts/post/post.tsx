import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
// import ThumbUpAltIcon from "@mui/material";
// import DeleteIcon from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { ThumbUpAltOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useStyle from "./style";
import { PostType } from "../../../constants/types";
import { deletePost, likePost } from "../../../actions/posts";
import { AppDispatch } from "src";

interface PostProps {
  post: PostType;
  setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Post: React.FC<PostProps> = ({ post, setCurrentId }) => {
  const classes = useStyle();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowMore, setShowMore] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile") || "null");

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    //console.log("Image", post.selectedFile);
    navigate(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        className={classes.cardActions}
        onClick={openPost}
        style={{ width: "100%", display: "block" }}
      >
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://storage.googleapis.com/regalflowers-cdn/mobile-img-2023-11-Regalflowers-scaled.webp"
          }
          title={post.title}
        />
      </ButtonBase>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {(user?.result?.googleId === post?.name ||
        user?.result?.name === post?.name) && (
        <div className={classes.overlay2}>
          <Button
            onClick={() => setCurrentId(post._id)}
            style={{ color: "white" }}
            size="small"
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography
          variant="body1"
          color="textSecondary"
          component="p"
          style={{ textAlign: "left" }}
        >
          {isShowMore ? post.message : post.message.slice(0, 50)}
          {post.message.length > 50 && (
            <Typography
              color="primary"
              variant="body2"
              onClick={() => setShowMore(!isShowMore)}
              style={{ cursor: "pointer" }}
            >
              {isShowMore ? "Show less" : "...Show more"}
            </Typography>
          )}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.name ||
          user?.result?.name === post?.name) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
