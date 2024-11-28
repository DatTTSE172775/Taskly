"use client";

import React, { useEffect } from "react";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from "react-icons/fi";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationProps {
  id: number;
  type: NotificationType;
  message: string;
  description?: string;
  onClose: (id: number) => void; // Callback để xóa notification
}

const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  message,
  description,
  onClose,
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <FiCheckCircle className="text-green-600 w-5 h-5 mr-3" />;
      case "error":
        return <FiXCircle className="text-red-600 w-5 h-5 mr-3" />;
      case "warning":
        return <FiAlertTriangle className="text-yellow-600 w-5 h-5 mr-3" />;
      case "info":
        return <FiInfo className="text-blue-600 w-5 h-5 mr-3" />;
      default:
        return null;
    }
  };

  const getBackgroundClass = () => {
    switch (type) {
      case "success":
        return "bg-green-200 text-green-800";
      case "error":
        return "bg-red-200 text-red-800";
      case "warning":
        return "bg-yellow-200 text-yellow-800";
      case "info":
        return "bg-blue-200 text-blue-800";
      default:
        return "";
    }
  };

  // Auto close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div
      className={`px-4 py-3 rounded-md shadow-md flex items-center ${getBackgroundClass()} mb-4`}
    >
      {getIcon()}
      <div className="flex-1">
        <span className="font-semibold">{message}</span>
        {description && <p className="text-sm mt-1">{description}</p>}
      </div>
      <button
        className="ml-3 text-gray-500 hover:text-gray-700"
        onClick={() => onClose(id)}
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
