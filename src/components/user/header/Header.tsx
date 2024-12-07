/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AppDispatch } from "@/store";
import { fetchUserInfo, logoutUser } from "@/store/actions/userAction";
import { useEffect } from "react";
import Avatar from "react-avatar";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import TaskAddButton from "../tasks/create/button/TaskAddButton";

export default function Header() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: any) => state.user.data);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      dispatch(fetchUserInfo(username));
    }
  }, [dispatch]);

  if (!user) {
    return (
      <div className="p-4 text-center text-gray-500">Loading user info...</div>
    );
  }

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="flex items-center justify-between bg-white shadow-md p-4">
      {/* Left: User Info */}
      <div className="flex items-center space-x-2">
        <Avatar
          name={user.username}
          round={true}
          size="40"
          src={user.avatar || undefined}
        />
        <div className="flex flex-col">
          <span className="font-medium text-gray-700">Hi, {user.username}</span>
        </div>
      </div>

      {/* Center: Search Bar
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search Tasks..."
          className="w-1/2 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}

      {/* Right: Add Task & Logout */}
      <div className="flex items-center space-x-4">
        <TaskAddButton />
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
