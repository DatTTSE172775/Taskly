/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNotification } from "@/hooks/useNotification";
import React, { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
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
      // Call your API
      console.log("Submitting:", formData);

      // Simulate API response delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      addNotification(
        "success",
        "Đăng ký Thành công",
        `Tài khoản đã được đăng ký thành công.`
      );
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      addNotification(
        "error",
        "Đăng ký thất bại",
        `Lỗi xảy ra khi đăng ký tài khoản: ${
          (error as any).message
        }. Vui lòng thử lại.`
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
      <h1 className="text-xl font-semibold text-center">Create an Account</h1>

      {/* Username Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      {/* Fullname Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="fullname" className="text-sm font-medium">
          Fullname
        </label>
        <Input
          id="fullname"
          name="fullname"
          type="text"
          placeholder="Enter your fullname"
          value={formData.fullname}
          onChange={handleChange}
        />
      </div>

      {/* Email Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Password Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
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
        {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
      </Button>
    </form>
  );
}
