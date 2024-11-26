import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/taskReducers";

const store = configureStore({
  reducer: {
    task: taskReducer,
  },
});

// Định nghĩa kiểu RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
