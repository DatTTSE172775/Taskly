"use client";

import TaskList from "@/components/user/tasks/list/TaskList";
import TaskAddButton from "@/components/user/tasks/modifyTasks/TaskAddButton";
import React from "react";

const TaskPage: React.FC = () => {
  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Taskly</h1>
        <TaskAddButton />
      </div>

      {/* Task List */}
      <TaskList />
    </div>
  );
};

export default TaskPage;
