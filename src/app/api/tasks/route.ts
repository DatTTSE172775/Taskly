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

    // get query params from request
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const priority = url.searchParams.get("priority");
    const sortBy = url.searchParams.get("sortBy") ?? "createdAt";
    const order = url.searchParams.get("order") ?? "desc";
    const page = parseInt(url.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(url.searchParams.get("limit") ?? "10", 10);

    // create filter object
    const filter: { userId: string; status?: string; priority?: string } = {
      userId,
    };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // calcuslate skip page
    const skip = (page - 1) * limit;

    // get tasks from database
    const tasks = await Task.find(filter)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit)
      .select("-__v -proress -assinees");

    // calculate total tasks
    const totalTasks = await Task.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: tasks,
      pagination: {
        total: totalTasks,
        page,
        limit,
        totalPages: Math.ceil(totalTasks / limit),
      },
    });
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
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      progress,
      subTasks,
      assignees,
      tags,
      comments,
      attachments,
      customeFields,
      visibility,
    } = await req.json();

    // Kiểm tra xem các trường có hợp lệ không
    if (!title || typeof title !== "string") {
      throw new Error("Tiêu đề (title) là bắt buộc và phải hợp lệ.");
    }
    const validStatuses = ["Pending", "In Progress", "Completed"];
    if (status && !validStatuses.includes(status)) {
      throw new Error("Trạng thái (status) không hợp lệ.");
    }

    const validPriorities = ["Low", "Medium", "High", "Critical"];
    if (priority && !validPriorities.includes(priority)) {
      throw new Error("Độ ưu tiên (priority) không hợp lệ.");
    }

    if (progress && (progress < 0 || progress > 100)) {
      throw new Error("Tiến độ (progress) phải nằm trong khoảng 0 - 100.");
    }

    const dueDateValue = dueDate ? new Date(dueDate) : null;
    console.log("🚀 ~ POST ~ dueDateValue:", dueDateValue);
    if (dueDateValue && isNaN(dueDateValue.getTime())) {
      throw new Error("Ngày hết hạn (dueDate) không hợp lệ.");
    }

    // Tạo task mới trong database
    const newTask = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : "",
      status: status ?? "Pending",
      priority: priority ?? "Medium",
      dueDate: dueDateValue,
      progress: progress ?? 0,
      subTasks: subTasks ?? [],
      assignees: assignees ?? [],
      tags: tags ?? [],
      comments: comments ?? [],
      attchments: attachments ?? [],
      customFields: customeFields ?? [],
      visibility: visibility ?? "Private",
      userId,
    });

    return NextResponse.json({ success: true, data: newTask }, { status: 201 });
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
