import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./style";
import { getPosts } from "../actions/posts";
import { AppDispatch } from "src";

interface PaginationsProps {
  page: string | number;
}

const Paginations: React.FC<PaginationsProps> = ({ page }) => {
  const classes = styles();
  const { numberOfPages } = useSelector((state: any) => state.posts);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page]);
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginations;
