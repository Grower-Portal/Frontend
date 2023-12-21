import React, { useState } from 'react';
import FirstScreen from './FirstScreen';
// Import other screen components as needed
import '../../styles/AddApplication.css';
import Layout from '../../components/Layout';

function AddApplication() {
    const [currentScreen, setCurrentScreen] = useState(1);
    const [farms, setFarms] = useState([{ farmNumber: '', tracts: [{ tractNumber: '', clus: [''] }] }]);

    // Navigate to the next screen
    const goToNextScreen = () => {
        setCurrentScreen(currentScreen + 1);
    };

    // Navigate to the previous screen
    const goToPreviousScreen = () => {
        setCurrentScreen(currentScreen - 1);
    };

    return (
        <Layout>
        <div className="add-application-container">
            {currentScreen === 1 && (
                <FirstScreen 
                    farms={farms} 
                    setFarms={setFarms} 
                    onNext={goToNextScreen} 
                />
            )}
            {/* Render other screens based on currentScreen */}
            {/* Example: {currentScreen === 2 && <SecondScreen ... />} */}
        </div>
        </Layout>
    );
}

export default AddApplication;
