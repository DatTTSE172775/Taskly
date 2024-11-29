import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

// api POST /auth/register
export async function POST(req: Request) {
  try {
    await dbConnect();
    const { username, password, fullname, email } = await req.json();

    if (!username || !password || !fullname || !email) {
      return NextResponse.json(
        { success: false, error: "Vui lòng điền đầy đủ thông tin." },
        { status: 400 }
      );
    }

    // check if username or email already exists
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUsername) {
      return NextResponse.json(
        { success: false, error: "Tên đăng nhập đã tồn tại." },
        { status: 400 }
      );
    }

    if (existingEmail) {
      return NextResponse.json(
        { success: false, error: "Email đã tồn tại." },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // cretae new User
    const newUser = await User.create({
      username,
      password: hashedPassword,
      fullname,
      email,
    });

    return NextResponse.json(
      { success: true, data: { id: newUser._id, username: newUser.username } },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `Lỗi khi đăng ký: ${error.message}`
        : "Đã xảy ra lỗi không xác định.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
