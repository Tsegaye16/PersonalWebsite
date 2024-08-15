import { AUTH, LOGOUT } from "../constants/actionTypes";

// Define the initial state
const initialState = {
  authData: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload }; // Fixed: use action.data instead of action.payload
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null }; // Fixed: set authData to null instead of auth
    default:
      return state;
  }
};

export default authReducer;
