"use client";

import { AppDispatch } from "@/store";
import { logoutUser } from "@/store/actions/userAction";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="w-64 bg-blue-600 text-white min-h-screen flex flex-col justify-between">
      {/* Logo and Navigation Links */}
      <div>
        <div className="p-4 text-lg font-bold">Taskly</div>
        <ul className="space-y-2">
          <li>
            <a href="/tasks" className="block p-2 hover:bg-blue-700">
              Tasks
            </a>
          </li>
          <li>
            <a href="/settings" className="block p-2 hover:bg-blue-700">
              Settings
            </a>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center justify-start w-full p-2 text-left hover:bg-blue-700 rounded-md"
        >
          <FiLogOut className="mr-2 text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
