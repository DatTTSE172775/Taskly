import { Input } from "@/components/ui/input";
import { useAddTaskForm } from "@/hooks/tasks/useAddTaskForm";
import { useRef } from "react";
import styles from "../../../../styles/tasks/crud/add/addTask.module.css"; // Import CSS module

interface TaskAddModalProps {
  onClose: () => void;
}

const TaskAddModal: React.FC<TaskAddModalProps> = ({ onClose }) => {
  const { formData, handleInputChange, handleSubmit } = useAddTaskForm(onClose);

  // Modal reference
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className={styles["task-overlay"]} // Sử dụng class từ module
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={styles["task-modal"]} // Sử dụng class từ module
      >
        <h3 className={styles["task-title"]}>Thêm Tasks mới</h3>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className={styles["form-group"]}>
            <label htmlFor="title" className={styles["form-label"]}>
              Title
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter task title"
              autoFocus
              required
            />
          </div>

          {/* Description */}
          <div className={styles["form-group"]}>
            <label htmlFor="description" className={styles["form-label"]}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter task description"
              rows={3}
              className={styles["textarea"]}
            />
          </div>

          {/* Status */}
          <div className={styles["form-group"]}>
            <label htmlFor="status" className={styles["form-label"]}>
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={styles["select"]}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Priority */}
          <div className={styles["form-group"]}>
            <label htmlFor="priority" className={styles["form-label"]}>
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className={styles["select"]}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* Due Date */}
          <div className={styles["form-group"]}>
            <label htmlFor="dueDate" className={styles["form-label"]}>
              Due Date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate || ""}
              onChange={handleInputChange}
              className={styles["input"]}
            />
          </div>

          {/* Tags */}
          <div className={styles["form-group"]}>
            <label htmlFor="tags" className={styles["form-label"]}>
              Tags
            </label>
            <Input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Enter tags separated by comma"
            />
          </div>

          {/* Buttons */}
          <div className={styles["button-group"]}>
            <button
              type="button"
              onClick={onClose}
              className={`${styles["button"]} ${styles["button-cancel"]}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles["button"]} ${styles["button-submit"]}`}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskAddModal;
