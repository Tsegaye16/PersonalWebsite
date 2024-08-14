import { Grow, Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Form from "../../components/form/Form";
import Posts from "../../components/posts/Posts";
import { getPosts } from "../../actions/posts";
import { AppDispatch } from "src";

const Home: React.FC = () => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  // const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          // className={classes.mainContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
