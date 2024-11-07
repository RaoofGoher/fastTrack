import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../component/Header';

const PrimaryLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
           
            <Header />

            
            <main className="flex-grow">
                <Outlet />
            </main>

            
            
        </div>
    );
};

export default PrimaryLayout;
