import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://datttse172775:0ujdjFHAQIVJCEZs@taskly.xvogo.mongodb.net/taskly?authSource=admin&retryWrites=true&w=majority";

async function testConnection() {
  try {
    console.log("Đang cố gắng kết nối tới MongoDB...");
    console.log("Chuỗi kết nối MongoDB URI:", MONGODB_URI);

    // Thử kết nối tới MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Kết nối MongoDB thành công!");

    // Thêm log chi tiết
    console.log("Thông tin kết nối:");
    console.log(`- Host: ${mongoose.connection.host}`);
    console.log(`- Port: ${mongoose.connection.port || "N/A (SRV)"}`);
    console.log(`- Database: ${mongoose.connection.name}`);
    console.log(`- Ready state: ${mongoose.connection.readyState}`);

    // Log thông tin chi tiết về kết nối
    console.log("Trạng thái kết nối:", mongoose.connection.readyState);
    console.log("Địa chỉ kết nối:", mongoose.connection.host);
    console.log("Tên database:", mongoose.connection.name);
  } catch (error: unknown) {
    // Log chi tiết lỗi nếu kết nối thất bại
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Kết nối MongoDB thất bại:");
    console.error(`- Thông báo lỗi: ${errorMessage}`);
    console.error(`- Mã lỗi: ${(error as any).code || "Không có mã lỗi"}`);
    console.error(
      `- Stack trace: ${(error as Error).stack || "Không có stack trace"}`
    );
  } finally {
    try {
      // Đóng kết nối sau khi thử nghiệm
      await mongoose.connection.close();
      console.log("Đã đóng kết nối MongoDB.");
    } catch (closeError) {
      console.error("Lỗi khi đóng kết nối MongoDB:", closeError);
    }
  }
}

testConnection();
