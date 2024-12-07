"use client";

import { format } from "date-fns";
import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface TaskCardProps {
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High" | "Critical";
  tags?: string[];
  dueDate?: string;
  subTasks?: { title: string; isCompleted: boolean }[];
  createdAt: string;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status,
  priority,
  tags = [],
  dueDate,
  subTasks = [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createdAt,
  onEdit,
  onDelete,
}) => {
  // Lấy màu trạng thái
  const getStatusColor = () => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-400";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border border-blue-400";
      case "Completed":
        return "bg-green-100 text-green-800 border border-green-400";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-400";
    }
  };

  // Lấy màu ưu tiên
  const getPriorityColor = () => {
    switch (priority) {
      case "Low":
        return "text-green-600 bg-green-50";
      case "Medium":
        return "text-yellow-600 bg-yellow-50";
      case "High":
        return "text-red-600 bg-red-50";
      case "Critical":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  // Format ngày tháng
  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return "No Due Date";
    try {
      const date =
        typeof dateString === "string" ? new Date(dateString) : dateString;
      return isNaN(date.getTime())
        ? "Invalid Date"
        : format(date, "dd/MM/yyyy");
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg hover:shadow-xl border border-gray-300 rounded-lg p-6 transition-all duration-200">
      {/* Actions */}
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={onEdit}
          className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
          title="Edit Task"
        >
          <FiEdit2 className="w-5 h-5" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
          title="Delete Task"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>

      {/* Priority */}
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor()}`}
      >
        {priority}
      </span>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-2 mb-4 line-clamp-3">
        {description}
      </p>

      {/* Status, Tags, and Due Date */}
      <div className="flex flex-wrap items-center justify-between mb-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
        >
          {status}
        </span>
        <span className="text-sm text-gray-500">
          Due: {formatDate(dueDate)}
        </span>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* SubTasks */}
      {subTasks.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">SubTasks</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            {subTasks.map((subTask, index) => (
              <li
                key={index}
                className={`${
                  subTask.isCompleted ? "line-through text-gray-400" : ""
                }`}
              >
                {subTask.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
