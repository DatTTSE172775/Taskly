import { AppDispatch } from "../index";

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt?: string;
}

export const fetchTasks = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "FETCH_TASKS_REQUEST" });

    const response = await fetch("/tasks");
    const data: Task[] = await response.json();

    dispatch({
      type: "FETCH_TASKS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_TASKS_FAILURE",
      payload: (error as Error).message,
    });
  }
};

export const addTask = (task: Task) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "ADD_TASK_REQUEST" });

    const response = await fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data: Task = await response.json();

    dispatch({
      type: "ADD_TASK_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ADD_TASK_FAILURE",
      payload: (error as Error).message,
    });
  }
};
