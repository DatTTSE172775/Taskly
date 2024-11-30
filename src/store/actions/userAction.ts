import { getCookie } from "cookies-next/client";
import { toast } from "react-toastify";
import { AppDispatch } from "../index";

// call api to get user info by usnername
export const fetchUserInfo =
  (username: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "FETCH_USER_INFO_REQUEST" });

      const token = getCookie("authToken");

      const response = await fetch(`/api/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

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
export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Không thể đăng xuất!");
    }

    localStorage.removeItem("username");

    // Xóa thông tin người dùng khỏi Redux Store
    dispatch({ type: "LOGOUT_USER" });

    // Chuyển hướng về trang chính
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  } catch (error) {
    toast.error((error as Error).message);
  }
};
