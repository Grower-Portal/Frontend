import React, { useState } from 'react';
import ScreenZero from './ScreenZero';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ScreenThree from './ThirdScreen';
// Import other screen components as needed
import '../../styles/AddApplication.css';
import Layout from '../../components/Layout';

function AddApplication() {
    const [currentScreen, setCurrentScreen] = useState(0); // Start from ScreenZero
    const [producerInfo, setProducerInfo] = useState({
        producerName: '',
        entityName: '',
        countyOfResidence: '',
        producerAddress: '',
        underservedStatus: '',
        baselineYield: '',
        primaryReason: '',
        csafPractices: ''
    });
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
                {currentScreen === 0 && (
                    <ScreenZero 
                        producerInfo={producerInfo} 
                        setProducerInfo={setProducerInfo} 
                        onNext={goToNextScreen} 
                    />
                )}
                {currentScreen === 1 && (
                    <FirstScreen 
                        farms={farms} 
                        setFarms={setFarms} 
                        onPrevious={goToPreviousScreen}
                        onNext={goToNextScreen} 
                    />
                )}
                {currentScreen === 2 && (
                    <SecondScreen
                        farms={farms}
                        setFarms={setFarms}
                        onPrevious={goToPreviousScreen}
                        onNext={goToNextScreen} 
                    />
                )}
                {currentScreen === 3 && (
                    <ScreenThree
                        farms={farms}
                        setFarms={setFarms}
                        onPrevious={goToPreviousScreen}
                        // Assuming no next screen after ScreenThree
                    />
                )}
                {/* Add more screens as needed */}
            </div>
        </Layout>
    );
}

export default AddApplication;
