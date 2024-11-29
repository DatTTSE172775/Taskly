import GuestNavigation from "@/components/tools/GuestNavigation";
import { Providers } from "@/store/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <Providers>
          {/* Hiển thị Navigation nếu là trang guest */}
          {<GuestNavigation />}
          {children}
          <ToastContainer position="bottom-right" autoClose={3000} />
        </Providers>
      </body>
    </html>
  );
}
