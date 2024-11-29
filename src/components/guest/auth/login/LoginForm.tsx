/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNotification } from "@/hooks/useNotification";
import React, { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useNotification();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call your API for login
      console.log("Logging in:", formData);

      // Simulate API response delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      addNotification(
        "success",
        "Đăng nhập thành công",
        `Bạn đã đăng nhập thành công với tài khoản ${formData.username}.`
      );
    } catch (error) {
      addNotification(
        "error",
        "Đăng nhập thất bại",
        `Lỗi xảy ra khi đăng nhập: ${(error as any).message}. Vui lòng thử lại.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md space-y-4 bg-white p-6 shadow-md rounded-md"
    >
      <h1 className="text-xl font-semibold text-center">Đăng nhập</h1>

      {/* Username Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="username" className="text-sm font-medium">
          Tên đăng nhập
        </label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Nhập tên người dùng"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      {/* Password Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Mật khẩu
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        variant="default"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>
    </form>
  );
}
