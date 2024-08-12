import React, { useEffect } from "react";
import { Container, Grid, Grow, AppBar, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import memories from "./images/memories.png";
import Form from "./components/form/Form";
import Posts from "./components/posts/Posts";
import useStyles from "./styles";
import { getPosts } from "./actions/posts";
import { AppDispatch } from "src";

const App: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Typography variant="h2" align="center" className={classes.heading}>
          Memories
        </Typography>
        <img
          src={memories}
          alt="memories"
          height={60}
          className={classes.image}
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
