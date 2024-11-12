import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';

const PrimaryLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow p-8">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default PrimaryLayout;
