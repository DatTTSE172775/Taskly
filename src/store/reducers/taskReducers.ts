import { Task } from "../actions/taskActions";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

interface Action {
  type: string;
  payload?: unknown;
}

const taskReducer = (state = initialState, action: Action): TaskState => {
  switch (action.type) {
    case "FETCH_TASKS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_TASKS_SUCCESS":
      return {
        ...state,
        tasks: action.payload as Task[],
        loading: false,
        error: null,
      };
    case "FETCH_TASKS_FAILURE":
      return { ...state, loading: false, error: action.payload as string };

    case "ADD_TASK_REQUEST":
      return { ...state, loading: true, error: null };
    case "ADD_TASK_SUCCESS":
      return {
        ...state,
        tasks: [...state.tasks, action.payload as Task],
        loading: false,
        error: null,
      };
    case "ADD_TASK_FAILURE":
      return { ...state, loading: false, error: action.payload as string };

    case "UPDATE_TASK_REQUEST":
      return { ...state, loading: true, error: null };
    case "UPDATE_TASK_SUCCESS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === (action.payload as Task)._id
            ? (action.payload as Task)
            : task
        ),
        loading: false,
        error: null,
      };
    case "UPDATE_TASK_FAILURE":
      return { ...state, loading: false, error: action.payload as string };

    case "DELETE_TASK_REQUEST":
      return { ...state, loading: true, error: null };
    case "DELETE_TASK_SUCCESS":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        loading: false,
        error: null,
      };
    case "DELETE_TASK_FAILURE":
      return { ...state, loading: false, error: action.payload as string };

    default:
      return state;
  }
};

export default taskReducer;
