import {
  Grow,
  Container,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ChipInput from "material-ui-chip-input";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Form from "../../components/form/Form";
import Posts from "../../components/posts/Posts";
import { getPosts, getPostsBySearch } from "../../actions/posts";

import { AppDispatch } from "src";
import useStyles from "./styles";
import Paginations from "../pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home: React.FC = () => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const handleKeyPress = (event: any) => {
    if (event.keyCode === 13) {
      searchPost();
    }
  };
  const handleAdd = (tag: string) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  return (
    <Grow in style={{ backgroundColor: "" }}>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              position="static"
              color="inherit"
              className={classes.appBarSearch}
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                onKeyDown={handleKeyPress}
                value={search}
                onChange={(event: any) => setSearch(event.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                variant="outlined"
                label="Search tags"
              />
              <Button
                onClick={searchPost}
                // className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Paginations page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
