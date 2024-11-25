"use client";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-600 text-white min-h-screen">
      <div className="p-4 text-lg font-bold">Taskly</div>
      <ul className="space-y-2">
        <li>
          <a href="/tasks" className="block p-2 hover:bg-blue-700">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/tasks" className="block p-2 hover:bg-blue-700">
            Tasks
          </a>
        </li>
        <li>
          <a href="/settings" className="block p-2 hover:bg-blue-700">
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
