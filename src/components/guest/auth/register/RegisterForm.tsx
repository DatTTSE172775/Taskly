/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoading } from "@/hooks/useLoading";
import { AppDispatch } from "@/store";
import { registerUser } from "@/store/actions/authActions";
import React, { useState } from "react";

import { useDispatch } from "react-redux";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const dispatch: AppDispatch = useDispatch();
  const { isLoading, startLoading, stopLoading } = useLoading();

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

    if (isLoading) return;
    startLoading();

    try {
      await dispatch(registerUser(formData));
    } catch (error) {
      console.error("Đăng ký thất bại: ", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md space-y-4 bg-white p-6 shadow-md rounded-md"
    >
      <h1 className="text-xl font-semibold text-center">Đăng ký tài khoản</h1>

      {/* Username Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="username" className="text-sm font-medium">
          Tên đăng nhập
        </label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Nhập tên đăng nhập"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      {/* Fullname Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="fullname" className="text-sm font-medium">
          Họ và tên
        </label>
        <Input
          id="fullname"
          name="fullname"
          type="text"
          placeholder="Nhập họ và tên"
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
          placeholder="Nhập email"
          value={formData.email}
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
        disabled={isLoading}
      >
        {isLoading ? "Đang đăng ký..." : "Đăng ký"}
      </Button>
    </form>
  );
}
