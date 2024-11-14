import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaTachometerAlt, FaUsers, FaCog } from "react-icons/fa";
import Header from '../component/Header';
import Footer from '../component/Footer';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <>
      <Header />
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
              className="text-white bg-orange-500 hover:bg-orange-100 hover:text-black p-2 rounded focus:outline-none transition ml-[-10px]"
            >
              {isSidebarOpen ? (
                <FaChevronLeft size={20} />
              ) : (
                <FaChevronRight size={20} />
              )}
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
      <Footer />
    </>
  );
};

export default AdminLayout;
