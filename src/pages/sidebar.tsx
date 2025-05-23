import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { title: "Home", path: "/" },
    { title: "Events", path: "/events"  },
    { title: "Notifications", path: "/notifications" },
  ];

  return (
    <div className="w-64 min-h-screen bg-white p-4 border border-gray-400 ">
      <h1 className="text-2xl font-bold mb-6 text-teal-700 underline">Sparrow</h1>
      <div className="space-y-4">
        {menuItems.map((item, idx) => (
          <Link to={item.path} key={idx}>
            <div className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded cursor-pointer">
              {item.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
