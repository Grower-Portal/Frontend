import React, { useState } from 'react';
import ScreenZero from './ScreenZero';
import FirstScreen from './FirstScreen';
import SubSecondScreen from './SubSecondScreen';
import SecondScreen from './SecondScreen';
import ScreenThree from './ThirdScreen';
import ScreenFour from './FourthScreen';
import ScreenFive from './ScreenFive';
import ScreenSix from './ScreenSix';
import ReviewApplication from './ReviewApplication'; // Adjust the path as necessary

import Layout from '../../components/Layout';
import '../../styles/AddApplication.css';

function AddApplication() {
    const [currentScreen, setCurrentScreen] = useState(0); 
    const [isReviewing, setIsReviewing] = useState(false);


    const [forestInfo, setForestInfo] = useState({
        // Initial state for forest info
    });
    // Start from ScreenZero
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
    const [fieldHistories, setFieldHistories] = useState({ /* ... */ });
    const [csafPracticeHistories, setCsafPracticeHistories] = useState({ /* ... */ });
    const [livestockInfo, setLivestockInfo] = useState({ /* ... */ });

    // Navigate to the next screen
    const goToNextScreen = () => {
        setCurrentScreen(currentScreen + 1);
    };

    // Navigate to the previous screen
    const goToPreviousScreen = () => {
        setCurrentScreen(currentScreen - 1);
    };

    const handleReview = () => {
        setIsReviewing(true);
        setCurrentScreen(null); // Or another value that doesn't match any screen
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
                    <SubSecondScreen
                        farms={farms} 
                        setFarms={setFarms} 
                        onPrevious={goToPreviousScreen}
                        onNext={goToNextScreen} 
                    />
                )}
                {currentScreen === 3 && (
                    <SecondScreen
                        farms={farms}
                        setFarms={setFarms}
                        onPrevious={goToPreviousScreen}
                        onNext={goToNextScreen} 
                    />
                )}
                {currentScreen === 4 && (
                    <ScreenThree
                        farms={farms}
                        setFarms={setFarms}
                        onPrevious={goToPreviousScreen}
                        // Assuming no next screen after ScreenThree
                        onNext={goToNextScreen}
                    />
                )}
                {currentScreen === 5 && (
                    <ScreenFour
                        farms={farms}
                        setFarms={setFarms}
                        onPrevious={goToPreviousScreen}
                        onNext={goToNextScreen}
                        // Assuming no next screen after ScreenThree
                    />
                )}
                {currentScreen === 6 && (
                    <ScreenFive
                        farms={farms}
                        setFarms={setFarms}
                        onPrevious={goToPreviousScreen}
                        onNext={goToNextScreen}
                        // Assuming no next screen after ScreenThree
                    />
                )}
                {currentScreen === 7 && (
                    <ScreenSix
                        farms={farms}
                        setFarms={setFarms}
                        onPrevious={goToPreviousScreen}
                        onReview={handleReview}

                 
                    />
                )}
                

                {isReviewing && (
                    <ReviewApplication
                    producerInfo={producerInfo}
                    farms={farms}
                    forestInfo={forestInfo}
                    fieldHistories={fieldHistories}
                    csafPracticeHistories={csafPracticeHistories}
                    livestockInfo={livestockInfo}
                        // Pass other pieces of state as needed
                    />
                )}
            </div>

           
        </Layout>
    );
}

export default AddApplication;
