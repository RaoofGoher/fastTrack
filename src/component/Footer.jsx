import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-200 py-4">
            <div className="text-center text-gray-700 text-sm">
                © {new Date().getFullYear()} <span className="font-semibold">FasTrak Connect</span>. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
