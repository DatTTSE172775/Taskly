import { AppDispatch } from "@/store";
import { addTask, fetchTasks } from "@/store/actions/taskActions";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const useAddTaskForm = (onClose: () => void) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending" as "Pending" | "In Progress" | "Completed",
  });

  const dispatch: AppDispatch = useDispatch();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement
    ) {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Task title cannot be empty.");
      return;
    }

    try {
      await dispatch(addTask(formData));
      toast.success("Task added successfully.");
      dispatch(fetchTasks());
      setFormData({
        title: "",
        description: "",
        status: "Pending" as "Pending" | "In Progress" | "Completed",
      });
      onClose();
    } catch (error) {
      toast.error("Failed to add task.");
      console.error(error);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
  };
};
