interface AuthState {
  loading: boolean;
  error: string | null;
  user: { username: string; email: string } | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
};

interface Action {
  type: string;
  payload?: unknown;
}

const authReducer = (state = initialState, action: Action): AuthState => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return { ...state, loading: true, error: null };
    case "REGISTER_SUCCESS":
      return { ...state, loading: false, error: null };
    case "REGISTER_FAILURE":
      return { ...state, loading: false, error: action.payload as string };

    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { ...state, loading: false, user: action.payload as any };
    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload as string };

    default:
      return state;
  }
};

export default authReducer;
