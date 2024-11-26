export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white shadow-md p-4 w-full">
      {/* Search Bar */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Avatar */}
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>{" "}
        {/* Placeholder Avatar */}
      </div>
    </header>
  );
}
