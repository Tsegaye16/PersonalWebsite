import { NavigateFunction } from "react-router-dom";
import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

export const signin =
  (formData: any, navigate: NavigateFunction) => async (dispatch: any) => {
    try {
      const { data } = await api.signIn(formData); // Ensure the API method is named correctly
      dispatch({ type: AUTH, payload: data });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

export const signup =
  (formData: any, navigate: NavigateFunction) => async (dispatch: any) => {
    try {
      const { data } = await api.signUp(formData); // Ensure the API method is named correctly
      dispatch({ type: AUTH, payload: data });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
