"use client";

import { AppDispatch, RootState } from "@/store";
import { fetchTasks } from "@/store/actions/taskActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../card/TaskCard";
import UpdateTaskForm from "../modifyTasks/UpdateTaskForm";

const TaskList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // get state from Redux store
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );
  const [selectedTask, setSelectedTask] = useState(null);

  //fetch tasks from API
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Hàm hiển thị form update
  const handleEditTask = (task: any) => {
    setSelectedTask(task);
  };

  // Hàm đóng form update sau khi lưu
  const handleCloseForm = () => {
    setSelectedTask(null); // Reset trạng thái
  };

  // Render UI
  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error loading tasks: {error}</div>;
  }

  if (!tasks || tasks.length === 0) {
    return <div>No tasks available</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task, index) => (
          <TaskCard
            key={task._id ?? index}
            title={task.title}
            description={task.description}
            status={task.status}
            createdAt={task.createdAt ?? ""}
            onEdit={() => task._id !== undefined && handleEditTask(task)}
          />
        ))}
      </div>
      {/* Hiển thị form update nếu có task được chọn */}
      {selectedTask && (
        <UpdateTaskForm task={selectedTask} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default TaskList;
