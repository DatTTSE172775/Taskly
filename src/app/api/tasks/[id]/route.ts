import Task from "@/models/Task";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

// API GET: Lấy Task theo ID
export async function GET(
  request: Request,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID không được cung cấp." },
        { status: 400 }
      );
    }

    await dbConnect();
    const task = await Task.findById(id);

    if (!task) {
      return NextResponse.json(
        { success: false, error: `Task với ID ${id} không tồn tại.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: task });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `Lỗi khi lấy Task: ${error.message}`
        : "Đã xảy ra lỗi không xác định.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// API PUT: Cập nhật Task theo ID
export async function PUT(
  req: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID không được cung cấp." },
        { status: 400 }
      );
    }

    await dbConnect();

    // Lấy user từ cookies
    const userCookie = req.cookies.get("userPayload")?.value;

    if (!userCookie) {
      throw new Error("Không tìm thấy thông tin người dùng trong cookies.");
    }

    const user = JSON.parse(userCookie);
    const userId = user.id;

    const body = await req.json();

    const updatedTask = await Task.findByIdAndUpdate(
      { _id: id, userId },
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTask) {
      return NextResponse.json(
        { success: false, error: `Task với ID ${id} không tồn tại.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedTask });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `Lỗi khi cập nhật Task: ${error.message}`
        : "Đã xảy ra lỗi không xác định.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// API DELETE: Xóa Task theo ID
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<Params> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID không được cung cấp." },
        { status: 400 }
      );
    }

    await dbConnect();

    // Lấy user từ cookies
    const userCookie = req.cookies.get("userPayload")?.value;

    if (!userCookie) {
      throw new Error("Không tìm thấy thông tin người dùng trong cookies.");
    }

    const user = JSON.parse(userCookie);
    const userId = user.id;

    const deletedTask = await Task.findByIdAndDelete({ _id: id, userId });

    if (!deletedTask) {
      return NextResponse.json(
        {
          success: false,
          error: `Task với ID ${id} không tồn tại hoặc không thuộc về bạn.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Task với ID ${id} đã được xóa.`,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `Lỗi khi xóa Task: ${error.message}`
        : "Đã xảy ra lỗi không xác định.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
