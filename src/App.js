import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import SignOut from './components/SignOut';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import StepsToFollow from './pages/StepsToFollow';
import UserInformation from './pages/UserInformation';
import SensorData from './pages/SensorData';
import ContactUs from './pages/ContactUs';
import Report from './pages/Report';
import AddApplication from './forms/AddApplication/AddApplication';



function App() {
  // eslint-disable-next-line
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData(){

      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      console.log(baseUrl)
      try{
        const response = await fetch(`${baseUrl}posts`)
        if (!response.ok){
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result)
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/SignOut" element={<SignOut />} />
          <Route path='/Dashboard' element={<Dashboard/>} />
          <Route path='/About' element={<About />} />
          <Route path='/StepsToFollow' element={<StepsToFollow />} />
          <Route path='/UserInformation' element={<UserInformation />} />
          <Route path='/SensorData' element={<SensorData />} />
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/Report' element={<Report />} />
          <Route path='AddApplication' element={<AddApplication />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
