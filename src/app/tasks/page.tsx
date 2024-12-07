"use client";

import TaskList from "@/components/user/tasks/list/TaskList";
import React from "react";

const TaskPage: React.FC = () => {
  return (
    <div className="p-6">
      {/* Task List */}
      <TaskList />
    </div>
  );
};

export default TaskPage;
