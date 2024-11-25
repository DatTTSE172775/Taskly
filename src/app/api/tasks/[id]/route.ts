import Task from "@/models/Task";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

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
    const body = await request.json();
    const updatedTask = await Task.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

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
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json(
        { success: false, error: `Task với ID ${id} không tồn tại.` },
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
