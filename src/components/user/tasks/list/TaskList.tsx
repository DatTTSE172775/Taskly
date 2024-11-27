"use client";

import { useNotification } from "@/hooks/useNotification";
import { AppDispatch, RootState } from "@/store";
import { deleteTask, fetchTasks, Task } from "@/store/actions/taskActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../card/TaskCard";
import UpdateTaskForm from "../modifyTasks/UpdateTaskForm";

const TaskList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Get state from Redux store
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  // Notification hook
  const { addNotification } = useNotification();

  // States for update and delete modals
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch tasks from API
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Handle update task
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseForm = () => {
    setSelectedTask(null);
  };

  // Handle delete task
  const handleDeleteTask = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return; // Prevent null errors
    try {
      await dispatch(deleteTask(taskToDelete._id!.toString()));
      // Thêm thông báo thành công
      addNotification(
        "success",
        "Xóa thành công",
        `Task "${taskToDelete.title}" đã được xóa.`
      );
      setTaskToDelete(null);
      setIsDeleteModalOpen(false);
    } catch {
      // Thêm thông báo lỗi
      addNotification(
        "error",
        "Xóa thất bại",
        `Xóa task "${taskToDelete.title} thất bại".`
      );
    }
  };

  const closeDeleteModal = () => {
    setTaskToDelete(null);
    setIsDeleteModalOpen(false);
  };

  // Render UI
  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error loading tasks: {error}</div>;
  }

  return (
    <div className="p-4">
      {/* Hiển thị danh sách thông báo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task, index) => (
          <TaskCard
            key={task._id ?? index}
            title={task.title}
            description={task.description}
            status={task.status}
            createdAt={task.createdAt ?? ""}
            onEdit={() => handleEditTask(task)}
            onDelete={() => handleDeleteTask(task)}
          />
        ))}
      </div>
      {selectedTask && (
        <UpdateTaskForm task={selectedTask} onClose={handleCloseForm} />
      )}
      {isDeleteModalOpen && taskToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete the task &quot;
              {taskToDelete.title}&quot;?
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteTask}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
