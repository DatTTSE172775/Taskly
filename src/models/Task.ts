import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Check if the model already exists to prevent OverwriteModelError
const Task = models.Task || model("Task", TaskSchema);

export default Task;
