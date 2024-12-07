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
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    dueDate: { type: Date },
    progress: { type: Number, min: 0, max: 0, default: 0 },
    subTasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    assignees: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["Owner", "Collaborator", "Viewer"],
          default: "Collaborator",
        },
        assignedAt: { type: Date, default: () => new Date().toISOString() },
      },
    ],
    statusHistory: [
      {
        status: {
          type: String,
        },
        updatedAt: { type: Date, default: () => new Date().toISOString() },
      },
    ],
    tags: [{ type: String }],
    comments: [
      {
        content: { type: String },
        createdBy: { type: Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: () => new Date().toISOString() },
      },
    ],
    attachments: [{ type: String }],
    customFields: [
      {
        fieldName: { type: String },
        value: { type: String },
      },
    ],
    isArchived: { type: Boolean, default: false },
    visibility: {
      type: String,
      enum: ["Public", "Private", "Team"],
      default: "Private",
    },
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

// Check if the model already exists to prevent OverwriteModelError
const Task = models.Task || model("Task", TaskSchema);

export default Task;
