import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import SignOut from './components/SignOut';
import ImageUpload from './pages/ImageUpload';
import About from './pages/About';
import StepsToFollow from './pages/StepsToFollow';
import UserInformation from './pages/UserInformation';
import SensorData from './pages/SensorData';
import ContactUs from './pages/ContactUs';
import Report from './pages/Report';
import AddApplication from './forms/AddApplication/AddApplication';
import ApplicationDashboard from './pages/ApplicationDashboard';
import ProtectedRoutes from './ProtectedRoute';
 

function App() {

  return (
      <div className="App">
        <Router>
        <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Register" element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Navigate to="/SignIn" />} />
            <Route path="/SignOut" element={<SignOut />} />
            <Route path="/ImageUpload" element={<ImageUpload />} />
            <Route path="/About" element={<About />} />
            <Route path="/StepsToFollow" element={<StepsToFollow />} />
            <Route path="/UserInformation" element={<UserInformation />} />
            <Route path="/SensorData" element={<SensorData />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/AddApplication" element={<AddApplication />} />
            <Route path="/ApplicationDashboard" element={<ApplicationDashboard />} />
          </Route>
        </Routes>
    </Router>
    </div>
  );
}

export default App;
