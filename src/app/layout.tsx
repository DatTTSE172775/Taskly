import GuestNavigation from "@/components/tools/GuestNavigation";
import NotificationList from "@/components/tools/NotificationList";
import { NotificationProvider } from "@/hooks/useNotification";
import { Providers } from "@/store/Providers";
import "./globals.css";

export const metadata = {
  title: "Taskly",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Bao bọc ứng dụng bằng Providers */}
        <NotificationProvider>
          <Providers>
            <NotificationList />
            {/* Hiển thị Navigation nếu là trang guest */}
            {<GuestNavigation />}
            {children}
          </Providers>
        </NotificationProvider>
      </body>
    </html>
  );
}
