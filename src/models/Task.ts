import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

// Check if the model already exists to prevent OverwriteModelError
const Task = models.Task || model("Task", TaskSchema);

export default Task;
