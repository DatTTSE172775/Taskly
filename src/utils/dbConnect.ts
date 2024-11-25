import mongoose from "mongoose";

// Lấy URI từ biến môi trường
const MONGODB_URI = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
  throw new Error("Vui lòng thêm MONGODB_URI vào file .env.local");
}

// Mở rộng global và cache kết nối
let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  try {
    // Nếu kết nối đã tồn tại, trả về kết nối cũ
    if (cached.conn) {
      return cached.conn;
    }

    // Nếu chưa có promise, tạo mới
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
        return mongoose;
      });
    }

    // Chờ kết nối hoàn tất
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Lỗi không xác định.";
    if (error.stack) {
      console.error("- Stack trace:", error.stack);
    }
    throw error; // Ném lỗi ra ngoài nếu cần debug thêm
  }
}

export default dbConnect;
