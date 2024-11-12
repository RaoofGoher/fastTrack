import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrimaryLayout from './layouts/PrimaryLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import ServicesSelection from './component/ServicesSelection.jsx';
import BillAndPayment from './component/BillAndPaymentInfo.jsx';
import Acceptence from './component/Acceptance.jsx';
import SalesOrder from './component/SalesOrder.jsx';
import Invoice from './component/Invoice.jsx';
import ConnectWithDrive from './component/ConnectWithDrive.jsx';
import DriveForm from './component/DriveForm.jsx';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrimaryLayout />}>
                    <Route index element={<HomePage />} />
                    
                    <Route path='/salesorder' element={<SalesOrder />} />
                    <Route path='/serviceselection' element={<ServicesSelection />} />
                    <Route path='/billandpayment' element={<BillAndPayment />} />
                    <Route path='/acceptance' element={<Acceptence />} />
                    <Route path='/invoice' element={<Invoice />} />
                    <Route path='/drive' element={<ConnectWithDrive />} />
                    <Route path='/driveform' element={<DriveForm />} />
                
                    
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
