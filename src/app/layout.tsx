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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
