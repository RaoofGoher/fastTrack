import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrimaryLayout from './layouts/PrimaryLayout.jsx';
import HomePage from './pages/HomePage.jsx';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrimaryLayout />}>
                    <Route index element={<HomePage />} />
                    
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
