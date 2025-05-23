

export const Navbar = () => {
  return (
    <nav className="w-full bg-sky-200 shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">Calendar</h1>
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <span>Admin</span>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </nav>
  );
};
