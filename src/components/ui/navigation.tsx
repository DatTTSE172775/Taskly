"use client";

import Link from "next/link";
import React from "react";

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Taskly
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600">
            Contact
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link href="/register">
            <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-100">
              Register
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
