import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingsSlice";
import userReducer from "./userSlice";
import historyReducer from "./historySlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    user: userReducer,
    history: historyReducer,
  },
});

export default store;
