import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const farmerId = queryParams.get("farmerId");
    const [currentScreen, setCurrentScreen] = useState(0); // Start from ScreenZero

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // Required for Chrome and Firefox
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

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

    console.log("tractfarms", farms);

    const farmNumberToFieldNameMapping = rows.map((row) => {
        if (row.farmNumber && row.clus.length > 0) {
            return {
                farmNumber: row.farmNumber,
                tractNumber: row.tractNumber,
                cluNumber: row.clus[0].fieldClu,
                fieldName: row.clus[0].fieldName,
                acres: row.clus[0].acres,
                fsaPhysicalLocation: row.clus[0].fsaPhysicalLocation

            };
        }
        return null;
    }).filter(Boolean);

    console.log("farmNumberToFieldNameMapping", farmNumberToFieldNameMapping);
    const [commodityForm, setCommodityForm] = useState([]);
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
        uploadedDocument: null
    }));

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

    // Function to submit the application data
const submitApplication = async () => {
    try {
        const mappedProducerInfo = {
            ...producerInfo,
            fieldName: farmNumberToFieldNameMapping.map(field => ({
                ...field,
                farm: rows
                    .filter(row => row.farmNumber === field.farmNumber)
                    .map(row => ({
                        ...row,
                        // Ensure tract is always an array even if empty
                        tract: rows
                        .filter(row => row.tractNumber)
                        .map(row => ({
                            ...row,
                            clu: rows
                            .filter(row => row.cluNumber)
                            .map(row => ({
                                ...row,
                                acres: parseFloat(row.acres),
                                fsaPhysicalLocation: row.fsaPhysicalLocation,
                            }))
                        }))
                    }))
            })),
            commodityInfo: commodityForm.map(form => ({
                ...form,
                commodityInfoId: 0,
                fieldNameId: 0,
                reportQtyAcres: parseFloat(form.reportQtyAcres),
                commodityCategory: form.commodityCategory,
                commodityType: form.commodityType,
                landUseHistory: form.fieldLandUseHistory,
                irrigationHistory: form.fieldIrrigationHistory,
                tillageHistory: form.fieldTillageHistory,
                csafPracticeHistory: form.fieldCsafPracticeHistory,
                pastCsafPracticeHistory: form.pastCsafPracticeHistory
            })),
            farmDetails: FarmDetailsData.map(form => ({
                farmDetailsId: 0,
                applicationAcres: parseFloat(form.applicationAcres),
                totalLandAreaAcres: parseFloat(form.totalLandArea),
                totalCroplandAcres: parseFloat(form.totalCropland),
                totalLiveStockAcres: parseFloat(form.totalLiveStock),
                produceLivestock: form.produceLivestock === 'Yes',
                livestockType1: form.livestockType1 || null,
                livestockHead1: parseInt(form.livestockHead1) || null,
                livestockType2: form.livestockType2 || null,
                livestockHead2: parseInt(form.livestockHead2) || null,
                livestockType3: form.livestockType3 || null,
                livestockHead3: parseInt(form.livestockHead3) || null,
                totalForestAreaAcres: parseFloat(form.totalForestArea),
                fsaPhysicalLocation: form.fsaPhysicalLocation,
                pastCsafPractice: form.pastCSAFPractice || null,
                farmId: 0
            }))
        };
        

        

        

    const mappedFormData = {
        ...formData,
        ccc860File: formData.ccc860File?.name,
        masterFarmerFile: formData.masterFarmerFile?.name,
        srNDAFile: formData.srNDAFile?.name,
        srAgreementFile: formData.srAgreementFile?.name
    };

    const response = await fetch('http://localhost:8080/api/applications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            farmerId: farmerId,
            producerInfo: mappedProducerInfo,
            applicationDate: new Date().toISOString(),
            status: 'Start Application'
        })
    });

        if (response.ok) {
            console.log('Application submitted successfully');
            // Perform any additional actions after successful submission, such as redirecting the user or showing a success message
        } else {
            console.error('Failed to submit application');
            // Handle error response
        }
    } catch (error) {
        console.error('Error submitting application:', error);
        // Handle fetch error
    }
};


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
                    />
                )}
                {currentScreen === 4 && (
                    <LivestockInformation
                        FarmDetailsData = {FarmDetailsData}
                        farmDetailsForm={farmDetailsForm}
                        setFarmDetailsForm={setFarmDetailsForm}
                        onPrevious={goToPreviousScreen}
                        onNext={goToNextScreen}
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
                    />
                )}
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
                        onSubmit={submitApplication}
                    />
                )}
                
            </div>
        </Layout>
    );
}

export default React.memo(AddApplication);
