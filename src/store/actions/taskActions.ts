import { AppDispatch } from "../index";

export interface Task {
  _id?: number;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt?: string;
}

export const fetchTasks = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "FETCH_TASKS_REQUEST" });

    const response = await fetch("/api/tasks");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success || !Array.isArray(data.data)) {
      throw new Error("API response is invalid or data is not an array");
    }

    // Chỉ gán data.data vào payload
    dispatch({
      type: "FETCH_TASKS_SUCCESS",
      payload: data.data,
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

    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();

    dispatch({
      type: "ADD_TASK_SUCCESS",
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: "ADD_TASK_FAILURE",
      payload: (error as Error).message,
    });
  }
};

export const updateTask =
  (id: string, updates: Partial<Task>) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "UPDATE_TASK_REQUEST" });

      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to update task");
      }

      dispatch({
        type: "UPDATE_TASK_SUCCESS",
        payload: data.data, // Updated task from API
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_TASK_FAILURE",
        payload: (error as Error).message,
      });
    }
  };

export const deleteTask = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: "DELETE_TASK_REQUEST" });

    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to delete task");
    }

    dispatch({
      type: "DELETE_TASK_SUCCESS",
      payload: id, // Chỉ cần truyền ID task đã xóa
    });
  } catch (error) {
    dispatch({
      type: "DELETE_TASK_FAILURE",
      payload: (error as Error).message,
    });
  }
};
