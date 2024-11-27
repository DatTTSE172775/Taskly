import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./reducers/taskReducers";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

// Định nghĩa kiểu RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
