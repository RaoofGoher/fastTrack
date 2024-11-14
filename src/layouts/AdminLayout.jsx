import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars, FaTachometerAlt, FaUsers, FaCog } from "react-icons/fa";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white ${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1
            className={`text-xl font-bold ${
              isSidebarOpen ? "block" : "hidden"
            } transition-opacity`}
          >
            Admin
          </h1>
          <button
            onClick={toggleSidebar}
            className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded focus:outline-none transition ml-[-10px]"
          >
            <FaBars size={20} />
          </button>
        </div>

        <ul className="mt-4 space-y-2 flex-grow">
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaTachometerAlt className="mr-4" />
            {isSidebarOpen && <span>Dashboard</span>}
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaUsers className="mr-4" />
            {isSidebarOpen && <span>Users</span>}
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaCog className="mr-4" />
            {isSidebarOpen && <span>Settings</span>}
          </li>
        </ul>

        <div className="p-4 border-t border-gray-700">
          {isSidebarOpen && (
            <p className="text-sm text-gray-400">© 2024 FastrackConnect</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
