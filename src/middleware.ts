import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET ?? "");

export async function middleware(req: NextRequest) {
  try {
    // Log bước lấy token từ cookies

    const token = req.cookies.get("authToken")?.value;

    if (!token) {
      console.error("Không tìm thấy token. Chuyển hướng về login.");
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Xác thực token
    const { payload } = await jwtVerify(token, SECRET_KEY);

    const response = NextResponse.next();
    response.cookies.set("userPayload", JSON.stringify(payload), {
      httpOnly: false, // Cần để client-side có thể đọc
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (err) {
    console.log("Middleware Error:", err);
    return NextResponse.json(
      { success: false, error: "Token không hợp lệ" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/tasks", "/settings", "/api/tasks/:path*"], // Middleware áp dụng cho các endpoint này
};
