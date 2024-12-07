import { Button } from "@/components/ui/button";
import { useButton } from "@/hooks/ui/useButton";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import TaskAddModal from "../modal/TaskAddModal";

const TaskAddButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading, handleClick } = useButton({
    onClick: () => {
      setIsModalOpen(true);
    },
  });

  return (
    <div className="relative">
      {/* Hiển thị nút Add Task nếu modal đóng */}
      {!isModalOpen && (
        <Button
          onClick={handleClick}
          variant="default"
          size="default"
          disabled={isLoading}
          className="p-4 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition"
        >
          <FiPlus className="w-6 h-6" /> Add Task
        </Button>
      )}

      {isModalOpen && <TaskAddModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default TaskAddButton;
