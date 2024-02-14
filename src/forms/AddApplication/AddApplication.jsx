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
    const [farmerId, setFarmerId] = useState(queryParams.get("farmerId"));
    const [applicationID, setApplicationID] = useState(0); // Application ID
    const [applicationDate, setApplicationDate] = useState(queryParams.get("applicationDate"));
    const [status, setStatus] = useState(queryParams.get("status"));
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
            landUseHistory: '',
            irrigationHistory: '',
            tillageHistory: '',
            csafPracticeHistory: '',
            pastCsafPracticeHistory: ''
        }));

        setCommodityData(updatedCommodityData);
    }, [rows]);

    
    // State to store commodity data
    const [commodityData, setCommodityData] = useState([]);
    const farmNumbersSet = new Set();
    const uniqueFarmNumberToFieldNameMapping = [];
    farmNumberToFieldNameMapping.forEach((farm) => {
        if (!farmNumbersSet.has(farm.farmNumber)) {
            uniqueFarmNumberToFieldNameMapping.push(farm);
            farmNumbersSet.add(farm.farmNumber);
        }
    });
    const FarmDetailsData = uniqueFarmNumberToFieldNameMapping.map((farm) => ({
        farmNumber: farm.farmNumber,
        applicationAcres: parseFloat(farm.acres),
        totalCroplandAcres: '',
        totalLandAreaAcres: '',
        produceLivestock: 'No',
        totalLiveStockAcres: '',
        livestockType1: '',
        livestockHead1: '',
        livestockType2: '',
        livestockHead2: '',
        livestockType3: '',
        livestockHead3: '',
        totalForestAreaAcres: '',
        fsaPhysicalLocation: farm.fsaPhysicalLocation,
        pastCsafPractice: '',
        transitioningToUsdaCertified: '',
    }));

    const [formData, setFormData] = useState({
        controllingMembersCount: '',
        hasCCC860Certification: '',
        membersContributingToCCC860: '',
        hasParticipatedInLSUMasterFarmerProgram: '',
        membersParticipatedInLSUMasterFarmerProgram: '',
        highestDegreeOfParticipationInMasterFarmerProgram: '',
        yearsOfExperience: '',
        farmedRiceIn2023: '',
        riceAcresFarmedIn2023: '',
        isFirstYearFarmingRice: '',
        mostRecentYearFarmingRice: '',
        riceAcresFarmedInMostRecentYear: '',
        percentageOfIncomeFromOnFarmActivities: '',
        volunteersForEconomicAnalysis: '',
        understandsContractWithSupremeRice: '',
        understandsProhibitionOfDoubleFunding: '',
        understandsPaymentFromSupreme: '',
        hasAuthorityToCompleteApplication: 'no',
        ccc860Attachment: null,
        masterFarmerParticipationAttachment: null,
        srNDAAttachment: null,
        srAgreementAttachment: null
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
            // Aggregate data for each fieldName
            
                // Find all tracts and CLUs for each farmNumber related to the current fieldName
                const farmEntries = uniqueFarmNumberToFieldNameMapping.map(form => {
                    const uniqueTractNumbers = new Set();
        const tracts = rows
            .filter(row => row.farmNumber === form.farmNumber)
            .filter(row => {
                if (!uniqueTractNumbers.has(row.tractNumber)) {
                    uniqueTractNumbers.add(row.tractNumber);
                    return true;
                }
                return false;
            })
            .map(row => {
                const uniqueCluNumbers = new Set();
                const clus = rows
                    .filter(innerRow => innerRow.tractNumber === row.tractNumber)
                    .filter(innerRow => {
                        if (!uniqueCluNumbers.has(innerRow.clus[0]?.fieldClu)) {
                            uniqueCluNumbers.add(innerRow.clus[0]?.fieldClu);
                            return true;
                        }
                        return false;
                    })
                    .map(cluRow => ({
                        cluId: 0,
                        cluNumber: cluRow.clus[0].fieldClu,
                        acres: cluRow.clus[0].acres,
                        fsaPhysicalLocation: cluRow.clus[0].fsaPhysicalLocation,
                        tractId: 0
                    }));
                            return { tractId: 0, tractNumber: row.tractNumber, farmId: 0, clu: clus};
                        });
                    const fieldNameEntries = commodityForm.filter(field => field.farmNumber === form.farmNumber).map(field =>{
                        return {
                            fieldName: field.fieldName,
                            reportQtyAcres: field.reportQtyAcres,
                            commodityInfo: commodityForm.find(commodity => commodity.farmNumber === form.farmNumber) || {}
                        }
                    });
    
                    return {
                        farmId: 0,
                        farmNumber: form.farmNumber,
                        tract: tracts,
                        fieldName: fieldNameEntries,
                        farmDetails: farmDetailsForm.find(details => details.farmNumber === form.farmNumber) || {}
                    };
                });
    
            const mappedProducerInfo = {
                ...producerInfo,
                farm: farmEntries
            };
    
            // Construct the payload
            const payload = {
                applicationId: 0,
                farmerId: farmerId, // Assuming a static value for demonstration; adjust as necessary.
                producerInfo: mappedProducerInfo,
                applicationDate: applicationDate, // Example date; adjust as necessary.
                status: 'Submitted'
            };
    
            // Send the request
            const response = await fetch('http://localhost:8080/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
    
            if (response.ok) {
                // const applicationId = response.data.applicationId;
                //const responseData = await response.json(); // Parse JSON response
                const responseData = await response.json(); // Parse JSON response
                const producerInfoId = responseData.producerInfo.producerInfoId; // Extract producerInfoId
                console.log('producerInfoId:', producerInfoId);
                console.log('Application submitted successfully');
                
                try{
                    const payload1 = {
                        producerInfoId,
                        ...formData
                        
                    }
                    const response1 = await fetch('http://localhost:8080//api/survey', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload1)
                    });
                    if (response1.ok) {
                        console.log('Survey submitted successfully');
                    } else {
                        console.error('Failed to submit Survey');
                    }
                } catch (error) {
                    console.error('Error submitting Survey:', error);
                }
            } else {
                console.error('Failed to submit application');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
        }
    };

    useEffect(() => {
        // Load data from localStorage
        const savedProgress = JSON.parse(localStorage.getItem('applicationProgress'));
        if (savedProgress) {
            setFarmerId(savedProgress.farmerId);
            setApplicationID(savedProgress.applicationID);
            setApplicationDate(savedProgress.applicationDate);
            setStatus(savedProgress.status);
            setCurrentScreen(savedProgress.currentScreen);
            setProducerInfo(savedProgress.producerInfo);
            setRows(savedProgress.rows);
            setFarms(savedProgress.farms);
            setCommodityForm(savedProgress.commodityForm);
            setFarmDetailsForm(savedProgress.farmDetailsForm);
            setFormData(savedProgress.formData);
        }
    }, []);

    useEffect(() => {
        // Save progress to localStorage
        const progressToSave = {
            farmerId,
            applicationID,
            applicationDate,
            status,
            currentScreen,
            producerInfo,
            rows,
            farms,
            commodityForm,
            farmDetailsForm,
            formData
        };
        localStorage.setItem('applicationProgress', JSON.stringify(progressToSave));
    }, [farmerId, applicationID, applicationDate, status, currentScreen, producerInfo, rows, farms, commodityForm, farmDetailsForm, formData]);
    


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
