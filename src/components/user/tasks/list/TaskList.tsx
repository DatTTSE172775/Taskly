"use client";

import { AppDispatch, RootState } from "@/store";
import { fetchTasks } from "@/store/actions/taskActions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../card/TaskCard";

const TaskList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // get state from Redux store
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  //fetch tasks from API
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleEditTask = (_id: number) => {
    console.log(`Edit task with ID: ${_id}`);
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
            onEdit={() => task._id !== undefined && handleEditTask(task._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
