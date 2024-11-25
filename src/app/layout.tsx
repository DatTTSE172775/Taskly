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
        {/* Đây là layout chung */}
        {children}
      </body>
    </html>
  );
}
