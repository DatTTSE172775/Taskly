import { toast } from "react-toastify";
import { AppDispatch } from "../index";

// call api to get user info by usnername
export const fetchUserInfo =
  (username: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "FETCH_USER_INFO_REQUEST" });

      const response = await fetch(`/api/users/${username}`);

      const data = await response.json();

      console.log("API Response:", data);

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Lấy thông tin người dùng thất bại");
      }

      dispatch({
        type: "FETCH_USER_INFO_SUCCESS",
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_USER_INFO_FAILURE",
        payload: (error as Error).message,
      });
    }
  };

// api for logout
export const logoutUser = () => (dispatch: AppDispatch) => {
  try {
    // Xóa thông tin người dùng khỏi localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");

    // Xóa thông tin người dùng khỏi Redux Store
    dispatch({ type: "LOGOUT_USER" });

    // Hiển thị thông báo
    toast.success("Đã đăng xuất thành công!");

    // Chuyển hướng về trang chính
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    toast.error((error as Error).message);
  }
};
