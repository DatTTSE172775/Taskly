"use client";

import { Input } from "@/components/ui/input";
import { AppDispatch } from "@/store";
import { addTask, fetchTasks } from "@/store/actions/taskActions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const TaskAddButton: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    status: "Pending" | "In Progress" | "Completed";
  }>({
    title: "",
    description: "",
    status: "Pending",
  });

  const dispatch: AppDispatch = useDispatch();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Tiêu đề không được để trống");
      return;
    }

    //call api addTask through Redux
    try {
      await dispatch(
        addTask({
          title: formData.title.trim(),
          description: formData.description.trim(),
          status: formData.status,
        })
      );

      console.log("Form data trước khi submit:", formData);

      toast.success("Task đã được tạo thành công.");
      dispatch(fetchTasks()); // Fetch tasks again to update the list

      // Clear the form and close modal
      setFormData({ title: "", description: "", status: "Pending" });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  return (
    <div>
      {/* Add Task Button */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add Task
      </button>

      {/* Modal for Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Add New Task</h3>

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
                  className="w-full border border-gray-300 rounded-lg p-2"
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
                  className="w-full border border-gray-300 rounded-lg p-2"
                  rows={3}
                  required
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
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
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
                  onClick={() => setIsFormOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskAddButton;
