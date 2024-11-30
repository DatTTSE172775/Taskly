import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    success: true,
    message: "Đã đăng xuất",
  });
  response.cookies.set("authToken", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // Đặt thời gian hết hạn trong quá khứ
  });
  return response;
}
