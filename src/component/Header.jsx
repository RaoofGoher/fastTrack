import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaClock, FaBars } from 'react-icons/fa';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
                {/* <img src="/path-to-your-logo.png" alt="Fastrak Connect Logo" className="h-12" /> */}
                <div>
                    <h1 className="text-xl font-bold">FASTRAK CONNECT</h1>
                    <p className="text-sm text-gray-600">MANAGED SERVICE RELATIONSHIP</p>
                </div>
            </div>

            {/* Hamburger Icon for Small Screens */}
            <div className="lg:hidden">
                <button onClick={toggleMenu} className="focus:outline-none">
                    <FaBars className="h-6 w-6 text-gray-700" />
                </button>
            </div>

            {/* Contact Info Section - Hidden on Small Screens */}
            <div className={`lg:flex space-x-8 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
                {/* Phone */}
                <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-full bg-gray-100">
                        <FaPhone className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="text-gray-700">(347) 246-4700</span>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-full bg-gray-100">
                        <FaEnvelope className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="text-gray-700">info@fastrakconnect.com</span>
                </div>

                {/* Live Support */}
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
