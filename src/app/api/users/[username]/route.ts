import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

interface Params {
  username: string;
}

export async function GET(req: Request, context: { params: Promise<Params> }) {
  try {
    const { username } = await context.params;

    if (!username) {
      return NextResponse.json(
        { success: false, error: "Tên người dùng không được cung cấp." },
        { status: 400 }
      );
    }

    await dbConnect();
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: `Người dùng với tên ${username} không tồn tại.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? ` Lỗi khi lấy người dùng: ${error.message}`
        : "Đã xảy ra lỗi không xác định.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
