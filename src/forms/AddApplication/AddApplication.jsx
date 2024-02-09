import React, { useState, useEffect } from 'react';
import ProducerInformation from './ProducerInformation';
import FarmTractCluForm from './FarmTractCluForm';
import CommodityInformation from './CommodityInformation';
import FarmInformation from './FarmInformation';
import LivestockInformation from './LivestockInformation';
import ForestInformation from './ForestInformation';
import GrowerSurvey from './Questioneer';
import Review from './Review';
import Layout from '../../components/Layout';
import '../../styles/AddApplication.css';

function AddApplication() {
    const [currentScreen, setCurrentScreen] = useState(0); // Start from ScreenZero
    const [producerInfo, setProducerInfo] = useState({
        producerName: '',
        producerEntityName: '',
        countyOfResidence: '',
        producerAddress: '',
        isUnderservedSmallProducer: '',
        baselineYield: 0,
        primaryReasonForApplying: '',
        implementedCsafPractices: ''
    });
    const [rows, setRows] = useState([]);
    const [farms, setFarms] = useState([{ farmNumber: '', tracts: [{ tractNumber: '', clus: [{ fieldClu: '', acres: '', fieldName: '' }] }] }]);


    const farmNumberToFieldNameMapping = rows.map((row) => {
        if (row.farmNumber && row.clus.length > 0) {
            return {
                farmNumber: row.farmNumber,
                fieldName: row.clus[0].fieldName,
                acres: row.clus[0].acres,
                fsaPhysicalLocation: row.clus[0].fsaPhysicalLocation

            };
        }
        return null;
    }).filter(Boolean);

    console.log("farmNumberToFieldNameMapping", farmNumberToFieldNameMapping);
    const [commodityForm, setCommodityForm] = useState([]);
    // [{farmNumber: '', tractNumber: '', clu: '', acres: '', commodityCategory: '', commodityType: '', fieldLandUseHistory: '', fieldIrrigationHistory: '', fieldTillageHistory: '', fieldCsafPracticeHistory: '', pastCsafPracticeHistory: ''}
    const [farmDetailsForm, setFarmDetailsForm] = useState([]);


     // Calculate total acres for each unique field name with respect to its farm ID
     useEffect(() => {
        const uniqueFields = {};
        rows.forEach(row => {
            const farmNumber = row.farmNumber;
            row.clus.forEach(clu => {
                const fieldName = clu.fieldName;
                if (!uniqueFields[`${farmNumber}-${fieldName}`]) {
                    uniqueFields[`${farmNumber}-${fieldName}`] = {
                        farmNumber,
                        fieldName,
                        acres: 0
                    };
                }
                uniqueFields[`${farmNumber}-${fieldName}`].acres += parseFloat(clu.acres);
            });
        });

        const updatedCommodityData = Object.values(uniqueFields).map(field => ({
            farmNumber: field.farmNumber,
            fieldName: field.fieldName,
            reportQtyAcres: field.acres.toFixed(3),
            commodityCategory: '',
            commodityType: 'Rice',
            fieldLandUseHistory: '',
            fieldIrrigationHistory: '',
            fieldTillageHistory: '',
            fieldCsafPracticeHistory: '',
            pastCsafPracticeHistory: ''
        }));

        setCommodityData(updatedCommodityData);
    }, [rows]);

    
    // State to store commodity data
    const [commodityData, setCommodityData] = useState([]);

    const FarmDetailsData = farmNumberToFieldNameMapping.map((farm) => ({
        farmNumber: farm.farmNumber,
        applicationAcres: farm.acres,
        totalCropland: '',
        totalLandArea: '',
        produceLivestock: 'No',
        livestockType1: '',
        livestockHead1: '',
        livestockType2: '',
        livestockHead2: '',
        livestockType3: '',
        livestockHead3: '',
        totalForestArea: '',
        fsaPhysicalLocation: farm.fsaPhysicalLocation,
        pastCSAFPractice: '',
        uploadedDocument: null, // To store the uploaded document file
    }));
    
    
   
//    const CommodityData = farmNumberToFieldNameMapping.map((farm) => ({
//         farmNumber: farm.farmNumber,
//         fieldName: farm.fieldName,
//         reportQtyAcres: farm.acres,
//         commodityCategory: '',
//         commodityType: 'Rice',
//         fieldLandUseHistory: '',
//         fieldIrrigationHistory: '',
//         fieldTillageHistory: '',
//         fieldCsafPracticeHistory: '',
//         pastCsafPracticeHistory: ''
//     }))

    const [formData, setFormData] = useState({
        controllingMembers: '',
        ccc860Certification: '',
        ccc860Members: '',
        participatedInLSUMasterFarmer: '',
        lSUMasterFarmerParticipants: '',
        highestDegreeOfParticipation: '',
        yearsOfExperience: '',
        farmedRiceIn2023: '',
        riceAcres2023: '',
        firstYearFarmingRice: '',
        lastYearFarmedRice: '',
        riceAcresLastYear: '',
        incomePercentage: '',
        participateInSDDStudy: '',
        agreementWithSupremeRice: '',
        understandingOfFundingProhibition: '',
        agreementOnAWDorSDDPayment: '',
        authorityToCompleteApplication: '',
        ccc860File: null,
        masterFarmerFile: null,
        srNDAFile: null,
        srAgreementFile: null
      });


    console.log("farmDetailsForm", farmDetailsForm);
    // Navigate to the next screen
    const goToNextScreen = () => {
        setCurrentScreen(currentScreen + 1);
    };

    // Navigate to the previous screen
    const goToPreviousScreen = () => {
        setCurrentScreen(currentScreen - 1);
    };

    console.log("formData", formData);

    return (
        <Layout>
            <div className="add-application-container">
                {currentScreen === 0 && (
                    <ProducerInformation 
                        producerInfo={producerInfo} 
                        setProducerInfo={setProducerInfo} 
                        onNext={goToNextScreen} 
                    />
                )}
                {currentScreen === 1 && (
                    <FarmTractCluForm 
                        //producerInfo={producerInfo}
                        // setProducerInfo={setProducerInfo} 
                        rows={rows}
                        setRows={setRows}
                        farms={farms} 
                        setFarms={setFarms} 
                        onPrevious={goToPreviousScreen}
                        onNext={goToNextScreen} 
                    />
                )}
                {currentScreen === 2 && (
                    <CommodityInformation
                        CommodityData = {commodityData}
                        commodityForm={commodityForm}
                        setCommodityForm={setCommodityForm}
                        onPrevious={goToPreviousScreen}
                        onNext={goToNextScreen} 
                    />
                )}
                {currentScreen === 3 && (
                    <FarmInformation
                        FarmDetailsData = {FarmDetailsData}
                        farmDetailsForm={farmDetailsForm}
                        setFarmDetailsForm={setFarmDetailsForm}
                        onPrevious={goToPreviousScreen}
                        onNext={goToNextScreen}
                        // Assuming no next screen after ScreenThree
                    />
                )}
                {currentScreen === 4 && (
                    <LivestockInformation
                        FarmDetailsData = {FarmDetailsData}
                        farmDetailsForm={farmDetailsForm}
                        setFarmDetailsForm={setFarmDetailsForm}
                        onPrevious={goToPreviousScreen}
                        onNext={goToNextScreen}
                        // Assuming no next screen after ScreenThree
                    />
                )}
                {currentScreen === 5 && (
                    <ForestInformation
                        FarmDetailsData = {FarmDetailsData}
                        farmDetailsForm={farmDetailsForm}
                        setFarmDetailsForm={setFarmDetailsForm}
                        setFarms={setFarms}
                        onPrevious={goToPreviousScreen}
                        onNext={goToNextScreen}
                        // Assuming no next screen after ScreenThree
                    />
                )}
                
                {/* Add more screens as needed */}
                {currentScreen === 6 && (
                    <GrowerSurvey
                        FarmDetailsData = {FarmDetailsData}
                        farmDetailsForm={farmDetailsForm}
                        setFarmDetailsForm={setFarmDetailsForm}
                        formData = {formData}
                        setFormData = {setFormData}
                        setFarms={setFarms}
                        onPrevious={goToPreviousScreen}
                        onNext={goToNextScreen}

                        // Assuming no next screen after ScreenThree
                    />
                )}

                {currentScreen === 7 && (
                    <Review
                        producerInfo={producerInfo}
                        rows={rows}
                        farms={farms}
                        commodityForm={commodityForm}
                        farmDetailsForm={farmDetailsForm}
                        formData={formData}
                        onPrevious={goToPreviousScreen}
                    />
                )}
                
            </div>
        </Layout>
    );
}

export default AddApplication;
