"use client";

import { Input } from "@/components/ui/input";
import { AppDispatch } from "@/store";
import { fetchTasks, updateTask } from "@/store/actions/taskActions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface UpdateTaskFormProps {
  task: any; // Task hiện tại
  onClose: () => void; // Hàm đóng form
}

const UpdateTaskForm: React.FC<UpdateTaskFormProps> = ({ task, onClose }) => {
  const dispatch: AppDispatch = useDispatch();

  // Form state với dữ liệu của task hiện tại
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });

  // Xử lý khi người dùng thay đổi input
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Xử lý submit để cập nhật task
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(updateTask(task._id, formData)); // Gửi API update
      await dispatch(fetchTasks()); // Fetch lại danh sách task
      onClose(); // Đóng form sau khi cập nhật
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h3 className="text-lg font-bold mb-4">Update Task</h3>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label
              htmlFor="task-title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <Input
              id="task-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="task-description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="task-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label
              htmlFor="task-status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="task-status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskForm;
