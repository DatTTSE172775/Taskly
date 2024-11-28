import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, // Mật khẩu (hashed)
    role: { type: String, enum: ["user", "member"], default: "user" },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    avatar: { type: String, default: "" }, // URL ảnh đại diện
    phone: { type: String, trim: true }, // Số điện thoại (tùy chọn)
    dateOfBirth: { type: Date }, // Ngày sinh (tùy chọn)
    lastLogin: { type: Date }, // Lần đăng nhập gần nhất
    oauthId: { type: String }, // ID xác thực từ Google
    resetPasswordToken: { type: String }, // Token đặt lại mật khẩu
    resetPasswordExpires: { type: Date }, // Hạn sử dụng token đặt lại mật khẩu
  },
  { timestamps: true } // Tự động thêm createdAt và updatedAt
);

const User = models.User || model("User", UserSchema);

export default User;
