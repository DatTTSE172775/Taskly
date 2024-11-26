import Header from "@/components/user/header/Header";
import Sidebar from "@/components/user/sidebar/Sidebar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />

          {/* Main Content Area */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
