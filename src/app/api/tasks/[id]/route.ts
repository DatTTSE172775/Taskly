/* eslint-disable @typescript-eslint/no-explicit-any */
import Task from "@/models/Task";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
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

    // fields allowed to update
    const allowedFields = [
      "title",
      "description",
      "status",
      "priority",
      "dueDate",
      "progress",
      "subTasks",
      "tags",
      "customFields",
      "visibility",
    ];

    const updateData = Object.keys(body)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj: { [key: string]: any }, key) => {
        obj[key] = body[key];
        return obj;
      }, {});

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, error: "Không có trường hợp lệ để cập nhật." },
        { status: 400 }
      );
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId },
      updateData,
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
