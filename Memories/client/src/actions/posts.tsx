import { Dispatch } from "redux";
import * as api from "../api";
// Action Creators
export const getPosts = () => async (dispatch: any) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const createPost = (post: any) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: "CREATE", payload: data });
  } catch (error: any) {
    console.log(error.message);
  }
};

export const updatePost =
  (id: any, post: any) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);

      dispatch({ type: "UPDATE", payload: data });
    } catch (err: any) {
      console.log("Error meta", err.message);
    }
  };

export const deletePost = (id: any) => async (dispatch: Dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (err: any) {
    console.log(err.message);
  }
};
