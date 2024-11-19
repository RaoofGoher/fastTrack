import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../services/career/authSlice"; // Adjust path to your authSlice
import {
  FaChevronLeft,
  FaChevronRight,
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaPowerOff,
} from "react-icons/fa";
import Header from "../component/Header";
import Footer from "../component/Footer";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Sign out function
  const handleSignOut = () => {
    dispatch(logout()); // Clear Redux state
    localStorage.removeItem("authToken"); // Clear token (if stored locally)
    navigate("/signin"); // Redirect to login page
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

          {/* Sign out button */}
          <div className="mt-auto p-4">
            <button
              onClick={handleSignOut}
              className={`flex items-center ml-[-10px] ${
                isSidebarOpen ? "px-5" : "px-1"
              } py-2 bg-orange-500 text-white hover:bg-red-600 hover:text-white transition rounded`}
            >
              {isSidebarOpen ? (
                <>
                  <FaSignOutAlt className="mr-4" />
                  <span>Sign Out</span>
                </>
              ) : (
                <FaPowerOff className="ml-2 mr-2 text-white" size={18} />
              )}
            </button>
          </div>

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
