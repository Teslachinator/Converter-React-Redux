import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./converterSlice";

export const store = configureStore({
  reducer: {
    converter: counterReducer,
  },
});
