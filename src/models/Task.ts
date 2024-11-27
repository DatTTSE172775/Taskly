import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Check if the model already exists to prevent OverwriteModelError
const Task = models.Task || model("Task", TaskSchema);

export default Task;
