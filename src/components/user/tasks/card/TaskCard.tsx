"use client";

import { format } from "date-fns";
import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi"; // Import icon chỉnh sửa từ react-icons

interface TaskCardProps {
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: string;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  createdAt,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "In Progress":
        return "bg-blue-500 text-white";
      case "Completed":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Format the date
  const formatDate = (dateString: string | Date) => {
    try {
      const date =
        typeof dateString === "string" ? new Date(dateString) : dateString; // Chuyển đổi nếu là chuỗi
      return isNaN(date.getTime())
        ? "Invalid Date"
        : format(date, "dd/MM/yyyy");
    } catch {
      return "Invalid Date"; // Fallback nếu lỗi
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 relative">
      {/* Icon chỉnh sửa */}
      <button
        onClick={onEdit}
        className="absolute top-2 right-10 text-gray-500 hover:text-blue-500"
        title="Edit Task"
      >
        <FiEdit2 className="w-5 h-5" />
      </button>

      {/* Icon xóa */}
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        title="Delete Task"
      >
        <FiTrash2 className="w-5 h-5" />
      </button>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      {/* Status and Created At */}
      <div className="flex items-center justify-between">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
        >
          {status}
        </span>
        <span className="text-sm text-gray-500">
          Created: {formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
