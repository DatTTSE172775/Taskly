import Task from "@/models/Task";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

// API GET: Lấy danh sách Tasks
export async function GET() {
  try {
    await dbConnect();
    const tasks = await Task.find({});
    console.log("Tasks fetched from DB:", tasks);
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
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json(); // Lấy dữ liệu từ request body
    const task = await Task.create(body);
    return NextResponse.json({ success: true, data: task }, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `Lỗi khi tạo công việc mới: ${error.message}`
        : "Đã xảy ra lỗi không xác định.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
