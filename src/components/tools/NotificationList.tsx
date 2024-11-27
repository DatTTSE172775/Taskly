"use client";

import { useNotification } from "@/hooks/useNotification";
import React from "react";
import Notification from "../ui/notification";

const NotificationList: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-5 right-5 w-96 space-y-2 z-50">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          type={notification.type}
          message={notification.message}
          description={notification.description}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
};

export default NotificationList;
