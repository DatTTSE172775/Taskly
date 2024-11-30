/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AppDispatch } from "@/store";
import { fetchUserInfo, logoutUser } from "@/store/actions/userAction";
import { useEffect } from "react";
import Avatar from "react-avatar";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: any) => state.user.data);
  console.log("User data from Redux:", user);

  useEffect(() => {
    const username = localStorage.getItem("username"); // Lấy username từ localStorage
    if (username) {
      dispatch(fetchUserInfo(username)); // Gọi API để lấy thông tin user
    }
  }, [dispatch]);

  if (!user) {
    return (
      <div className="p-4 text-center text-gray-500">
        Đang tải thông tin người dùng...
      </div>
    );
  }

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="flex items-center justify-between bg-white shadow-md p-4 w-full">
      {/* User Info */}
      <div className="flex items-center space-x-2">
        <Avatar
          name={user.username}
          round={true}
          size="40"
          src={user.avatar || undefined} // Nếu có avatar thì hiển thị avatar
        />
        <div className="flex flex-col">
          <span className="font-medium text-gray-700">
            Xin chào, {user.username}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="w-1/2 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Logout Icon */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100"
          title="Logout"
        >
          <FiLogOut className="text-gray-700 w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
