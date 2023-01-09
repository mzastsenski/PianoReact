import { configureStore } from "@reduxjs/toolkit";
import data from "./dataSlice";

const store = configureStore({
  reducer: { data },
});

export { store };
