import { Providers } from "@/store/Providers";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
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
          <ConfigProvider>{children}</ConfigProvider>
        </Providers>
      </body>
    </html>
  );
}
