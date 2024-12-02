import Task from "@/models/Task";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

// API GET: Lấy danh sách Tasks
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const userCookie = req.cookies.get("userPayload")?.value;

    if (!userCookie) {
      throw new Error("Không tìm thấy thông tin người dùng trong headers.");
    }

    const user = JSON.parse(userCookie);
    const userId = user.id;

    const tasks = await Task.find({ userId });

    if (!Array.isArray(tasks)) {
      throw new Error("Database did not return an array");
    }

    return NextResponse.json({ success: true, data: tasks });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `Lỗi khi lấy danh sách công việc: ${error.message}`
        : "Đã xảy ra lỗi không xác định.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// API POST: Tạo Task mới
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Lấy thông tin user từ cookies
    const userCookie = req.cookies.get("userPayload")?.value;

    if (!userCookie) {
      throw new Error("Không tìm thấy thông tin người dùng trong cookies.");
    }

    const user = JSON.parse(userCookie);
    const userId = user.id;

    if (!userId) {
      throw new Error("User ID không hợp lệ hoặc không tồn tại trong cookies.");
    }

    // Lấy dữ liệu từ body request
    const { title, description, status } = await req.json();

    // Kiểm tra xem các trường có hợp lệ không
    if (!title || typeof title !== "string") {
      throw new Error("Tiêu đề (title) là bắt buộc và phải là chuỗi.");
    }

    if (description && typeof description !== "string") {
      throw new Error("Mô tả (description) phải là chuỗi nếu được cung cấp.");
    }

    const validStatuses = ["Pending", "In Progress", "Completed"];
    if (!validStatuses.includes(status)) {
      throw new Error("Trạng thái (status) không hợp lệ.");
    }

    // Tạo task mới trong database
    const newTask = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : "",
      status,
      userId,
    });

    return NextResponse.json({ success: true, data: newTask }, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `Lỗi khi tạo công việc mới: ${error.message}`
        : "Đã xảy ra lỗi không xác định.";

    console.error(errorMessage);

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
