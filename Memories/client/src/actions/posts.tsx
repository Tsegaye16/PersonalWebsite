import { Dispatch } from "redux";
import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT,
} from "../constants/actionTypes";

// Action Creators
export const getPost = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error: any) {
    console.log(error.message);
  }
};
export const getPosts = (page: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getPostsBySearch =
  (searchQuery: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const {
        data: { data },
      } = await api.fetchPostsBySearch(searchQuery);

      dispatch({ type: FETCH_BY_SEARCH, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

export const createPost =
  (post: any, navigate: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createPost(post);
      navigate(`/posts/${data._id}`);
      dispatch({ type: CREATE, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error: any) {
      console.log(error.message);
    }
  };

export const updatePost =
  (id: any, post: any) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);

      dispatch({ type: UPDATE, payload: data });
    } catch (err: any) {
      console.log("Error meta", err.message);
    }
  };

export const deletePost = (id: any) => async (dispatch: Dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const likePost = (id: any) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const commentPost =
  (value: any, id: any) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.comment(value, id);
      console.log("Data:", data);

      dispatch({ type: COMMENT, payload: data });

      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };
