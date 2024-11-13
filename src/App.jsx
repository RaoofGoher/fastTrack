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
import CareerPage from './pages/CareerPage.jsx';
import UploadButton from './component/UploadDocs.jsx';
import PositionInfo from './component/careers/PositionInfo.jsx'
import ProfessionalExp from './component/careers/ProfessionalExp.jsx'
import SkillAssement from './component/careers/SkillAssesment.jsx'
import Education from './component/careers/Educations.jsx'
import VideoIntro from './component/careers/VideoIntro.jsx'
import Attachements from './component/careers/Attachements.jsx'
import Confirmation from './component/careers/Confirmation.jsx'
import OAuthCallback from './component/OuthCallBack.jsx'

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
                    <Route path='/careers' element={<CareerPage />} />
                    <Route path='/uploaddocs' element={<UploadButton />} />
                    {/* Careers */}
                    <Route path='/positioninfo' element={<PositionInfo />} />
                    <Route path='/professionalexp' element={<ProfessionalExp />} />
                    <Route path='/skillassement' element={<SkillAssement />} />
                    <Route path='/education' element={<Education />} />
                    <Route path='/videointro' element={<VideoIntro />} />
                    <Route path='/attachements' element={<Attachements />} />
                    <Route path='/confirmation' element={<Confirmation />} />
                    <Route path="/oauth-callback" element={<OAuthCallback />} />
                
                    
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
