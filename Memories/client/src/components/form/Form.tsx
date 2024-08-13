import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyle from "./style";
import { createPost, updatePost } from "../../actions/posts";
import { AppDispatch } from "src";

interface FormProps {
  currentId: string | null;
  setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Form: React.FC<FormProps> = ({ currentId, setCurrentId }) => {
  const post = useSelector((state: any) =>
    currentId ? state.posts.find((p: any) => p._id === currentId) : null
  );
  const [postData, setPostData] = useState<any>({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyle();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("ID:", currentId);
    if (currentId) {
      console.log("jaskshj");

      dispatch(updatePost(currentId, postData));
      clear();
    } else {
      console.log("Posted Data:", postData);
      dispatch(createPost(postData));
      clear();
    }
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(event) =>
            setPostData({ ...postData, creator: event.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(event) =>
            setPostData({ ...postData, title: event.target.value })
          }
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(event) =>
            setPostData({ ...postData, message: event.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(event) =>
            setPostData({ ...postData, tags: event.target.value })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multimple={false}
            onDone={({ base64 }: { base64: string }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          style={{ marginBottom: "10px" }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
