"use client";

import React from "react";
import TaskCard from "../card/TaskCard";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: string;
}

const TaskList: React.FC = () => {
  // Dummy data for tasks
  const tasks: Task[] = [
    {
      id: 1,
      title: "Design Homepage",
      description: "Create the homepage design for the new project.",
      status: "In Progress",
      createdAt: "2024-11-25",
    },
    {
      id: 2,
      title: "Fix Bug #123",
      description: "Resolve the login issue reported by QA team.",
      status: "Pending",
      createdAt: "2024-11-23",
    },
    {
      id: 3,
      title: "Write API Documentation",
      description: "Complete documentation for the payment gateway APIs.",
      status: "Completed",
      createdAt: "2024-11-20",
    },
    {
      id: 4,
      title: "Prepare Demo",
      description: "Prepare the demo for client presentation next week.",
      status: "Pending",
      createdAt: "2024-11-22",
    },
  ];

  const handleEditTask = (id: number) => {
    console.log(`Edit task with ID: ${id}`);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            createdAt={task.createdAt}
            onEdit={() => handleEditTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
