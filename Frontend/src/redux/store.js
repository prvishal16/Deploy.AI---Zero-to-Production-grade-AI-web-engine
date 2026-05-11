import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";  // 👈 name change

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});