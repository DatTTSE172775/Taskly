import { toast } from "react-toastify";
import { AppDispatch } from "../index";
import { RegisterData } from "../types/authType";

export const registerUser =
  (userData: RegisterData) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: "REGISTER_REQUEST" });

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Đăng ký thất bại");
      }

      dispatch({ type: "REGISTER_SUCCESS" });
      // Hiển thị thông báo thành công
      toast.success("Tài khoản đã được đăng ký thành công. Hãy đăng nhập!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: (error as Error).message,
      });
      // Hiển thị thông báo lỗi
      toast.error(`Đăng ký thất bại: ${(error as Error).message}`);
    }
  };
