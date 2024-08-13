import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
//import thunk from "redux-thunk"; // No curly braces needed here
import App from "./App";
import reducers from "./reducers";
import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
export type AppDispatch = typeof store.dispatch;
