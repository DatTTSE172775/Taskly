import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducers";
import tasksReducer from "./reducers/taskReducers";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
  },
});

// Định nghĩa kiểu RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
