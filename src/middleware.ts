import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET ?? "");

export async function middleware(req: NextRequest) {
  try {
    // Log bước lấy token từ cookies
    const token = req.cookies.get("authToken")?.value;

    if (!token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Xác thực token
    const { payload } = await jwtVerify(token, SECRET_KEY);

    req.headers.set("user", JSON.stringify(payload));

    return NextResponse.next(); // Cho phép request tiếp tục
  } catch (err) {
    console.log("Middleware Error:", err);
    return NextResponse.json(
      { success: false, error: "Token không hợp lệ" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/tasks", "/settings", "/api/users/:path*", "/api/tasks/:path*"], // Middleware áp dụng cho các endpoint này
};
