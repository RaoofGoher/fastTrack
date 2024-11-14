import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaClock, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <div className="relative flex items-center justify-between p-4 bg-white shadow-md">
            {/* Logo Section */}
            <Link to={"/"}>
            <div className="flex items-center space-x-2">
                <div>
                    <h1 className="text-xl font-bold">FASTRAK CONNECT</h1>
                    <p className="text-sm text-gray-600">MANAGED SERVICE RELATIONSHIP</p>
                </div>
            </div>
            </Link>
            {/* Hamburger Icon or Cross Button */}
            <div className="lg:hidden">
                <button
                    onClick={toggleMenu}
                    className="focus:outline-none"
                >
                    {isMenuOpen ? (
                        <FaTimes className="h-6 w-6 text-gray-700" />
                    ) : (
                        <FaBars className="h-6 w-6 text-gray-700" />
                    )}
                </button>
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div
                    className="absolute right-4 top-16 bg-white shadow-lg border rounded-lg z-50 w-64 p-4"
                >
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="p-2 rounded-full bg-gray-100">
                            <FaPhone className="h-5 w-5 text-gray-600" />
                        </div>
                        <span className="text-gray-700">(347) 246-4700</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="p-2 rounded-full bg-gray-100">
                            <FaEnvelope className="h-5 w-5 text-gray-600" />
                        </div>
                        <span className="text-gray-700">info@fastrakconnect.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-full bg-gray-100">
                            <FaClock className="h-5 w-5 text-gray-600" />
                        </div>
                        <span className="text-gray-700">24/7, 365 days Live Support</span>
                    </div>
                </div>
            )}

            {/* Contact Info Section - Hidden on Small Screens */}
            <div className="hidden lg:flex space-x-8">
                <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-full bg-gray-100">
                        <FaPhone className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="text-gray-700">(347) 246-4700</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-full bg-gray-100">
                        <FaEnvelope className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="text-gray-700">info@fastrakconnect.com</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-full bg-gray-100">
                        <FaClock className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="text-gray-700">24/7, 365 days Live Support</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
