interface UserState {
  loading: boolean;
  data: {
    username: string;
    fullname: string;
    email: string;
    avatar?: string;
    role?: string;
    status?: string;
  } | null;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  data: null,
  error: null,
};

interface Action {
  type: string;
  payload?: unknown;
}

const userReducer = (state = initialState, action: Action): UserState => {
  switch (action.type) {
    case "FETCH_USER_INFO_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_USER_INFO_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload as UserState["data"],
        error: null,
      };
    case "FETCH_USER_INFO_FAILURE":
      return { ...state, loading: false, error: action.payload as string };
    case "LOGOUT_USER": // Xóa dữ liệu người dùng
      return {
        ...state,
        data: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
