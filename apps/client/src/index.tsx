import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import login from "./activities/login/features/login";
import settings from "./activities/settings/features/settings";
import play from "./activities/play/features/play";
import listRooms from "./activities/listRooms/features/listRooms";
import App from "./App";
import "./index.css";
import { AppState } from "./models/Nouns";
import { SnackbarProvider } from "notistack";

require("dotenv").config({ path: `.env.${process.env.REACT_APP_ENVIRONMENT}` });

const store = configureStore<AppState>({
  reducer: { login, play, listRooms, settings },
});
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
