import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// Define the secret key for JWT
const SECRET_KEY = process.env.JWT_SECRET ?? "";

// Middleware function
export function middleware(req: NextRequest) {
  const token = req.headers.get("Authorization")?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return NextResponse.json(
      { success: false, error: "Lỗi xác thực: Toke không tồn tại" },
      { status: 401 }
    );
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    // Attach user info to the request (if needed)
    req.headers.set("user", JSON.stringify(decoded));
    return NextResponse.next(); // Allow request to proceed
  } catch {
    return NextResponse.json(
      { success: false, error: "Lỗi xác thực: Token không hợp lệ" },
      { status: 401 }
    );
  }
}

// Protect specific routes
export const config = {
  matcher: [
    // "/api/tasks/:path*", // Protect tasks APIs
  ],
};
