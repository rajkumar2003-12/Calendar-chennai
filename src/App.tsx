import Calendar from "./camponents/calendar";
import { Navbar } from "./camponents/navbar";

const Sidebar = () => {
  const menuItems = [
    'Home', 'Programs', 'Events', 'Memberships', 'Documents',
    'Payments', 'People', 'Communication', 'Notifications', 'Search',
  ];

  return (
    <div className="w-64 min-h-screen bg-[#f8f9fc] p-4 border-r">
      <h1 className="text-2xl font-bold mb-6 text-teal-700 underline">Sparrow</h1>
      <ul className="space-y-3">
        {menuItems.map((item, idx) => (
          <li key={idx} className="text-gray-700 hover:text-blue-600 cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export function CalendarDashboard(){
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Calendar/>
        </main>
      </div>
    </div>
  );
};
