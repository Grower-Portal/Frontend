import React from 'react';

const ReviewApplication = ({
    producerInfo,
    farms,
    forestInfo,
    farmInformation,
    livestockInformation = []
    // Assume other states like fieldHistories, csafPracticeHistories, livestockInfo have been passed as props
}) => {
    return (
        <div className="review-application-container">
            <h1>Review Your Application</h1>

            <div>
                <h2>Producer Information</h2>
                <p>Producer Name: {producerInfo.producerName}</p>
                <p>Entity Name: {producerInfo.entityName}</p>
                <p>County of Residence: {producerInfo.countyOfResidence}</p>
                <p>Producer Address: {producerInfo.producerAddress}</p>
                <p>Underserved Status: {producerInfo.underservedStatus}</p>
                <p>Baseline Yield: {producerInfo.baselineYield}</p>
                <p>Primary Reason for Applying: {producerInfo.primaryReason}</p>
                <p>CSAF Practices: {producerInfo.csafPractices}</p>
            </div>

            {/* Farms Information */}
            <div>
                <h2>Farm and Tract Details</h2>
                {farms.map((farm, farmIndex) => (
                    <div key={`farm-${farmIndex}`}>
                    <h3>Farm {farmIndex + 1}</h3>
                    <p>Farm Number: {farm.farmNumber}</p>
                    {farm.tracts.map((tract, tractIndex) => (
                        <div key={`tract-${tractIndex}`}>
                        <p>Tract Number: {tract.tractNumber}</p>
                        {tract.clus.map((clu, cluIndex) => (
                            <div key={`clu-${cluIndex}`}>
                            <p>Field Clu: {clu.fieldClu}</p>
                            <p>Acres: {clu.acres}</p>
                            <p>Field Name: {clu.fieldName}</p>
                            </div>
                        ))}
                        </div>
                    ))}
                    </div>
                ))}
            </div>
                    
            {/* Display Commodity Information from ScreenTwo */}
            <div>
                <h2>Commodity Information</h2>
                {farms.map((farm, index) => (
                    <div key={index}>
                        <p>Farm ID: {farm.farmNumber}</p>
                        <p>Field Name: {farm.fieldName}</p>
                        <p>Report Qty (Acres): {farm.reportQtyAcres}</p>
                        <p>Commodity Category: {farm.commodityCategory}</p>
                        <p>Commodity Type: {farm.commodityType}</p>
                    </div>
                ))}
            </div>

      
             {/* Field Histories from ScreenTwo */}
             <div>
                <h2>Field Histories</h2>
                {farms.map((farm, farmIndex) => (
                    <div key={farmIndex}>
                        <h3>Farm ID: {farm.farmNumber}</h3>
                        {farm.tracts.map((tract, tractIndex) => (
                            <div key={tractIndex}>
                                <p>Field Name: {tract.tractNumber}</p>
                                <p>Field Land Use History: {tract.landUseHistory}</p>
                                <p>Field Irrigation History: {tract.irrigationHistory}</p>
                                <p>Field Tillage History: {tract.tillageHistory}</p>
                                {/* Add any additional fields that are needed */}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
              {/* CSAF Practice Histories from ScreenThree */}
              <div>
                <h2>CSAF Practice Histories</h2>
                {farms.map((farm, farmIndex) => (
                    <div key={`farm-csaf-${farmIndex}`}>
                        <h3>Farm ID: {farm.farmNumber}</h3>
                        {farm.tracts.map((tract, tractIndex) => (
                            <div key={`tract-csaf-${tractIndex}`}>
                                <p>Field Name: {tract.tractNumber}</p>
                                <p>CSAF Practice History: {tract.csafPracticeHistory}</p>
                                <p>Past CSAF Practice History: {tract.pastCsafPracticeHistory}</p>
                                {/* You can add more fields if there are more details to show */}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* Farm Information from FourthScreen */}
            <div>
                <h2>Farm Information</h2>
                {farms.map((farm, index) => (
                    <div key={`farm-${index}`}>
                        <h3>Farm ID: {farm.farmNumber}</h3>
                        <p>Application Acres: {farm.applicationAcres}</p>
                        <p>Total Land Area (Acres): {farm.totalLandArea}</p>
                        <p>Produce Livestock: {farm.produceLivestock}</p>
                    </div>
                ))}
            </div>
                 {/* Livestock Information from ScreenFive */}
                 <div>
                <h2>Livestock Information</h2>
                {livestockInformation && livestockInformation.map((livestock, index) => (
                    <div key={`livestock-${index}`}>
                        <p>Livestock Type 1: {livestock.livestockType1}</p>
                        <p>Livestock Head 1: {livestock.livestockHead1}</p>
                        <p>Livestock Type 2: {livestock.livestockType2}</p>
                        <p>Livestock Head 2: {livestock.livestockHead2}</p>
                        <p>Livestock Type 3: {livestock.livestockType3}</p>
                        <p>Livestock Head 3: {livestock.livestockHead3}</p>
                    </div>
                ))}
            </div>
                  {/* Forest Information */}
                  <div>
                <h2>Forest Information</h2>
                <p>Total Forest Area: {forestInfo.totalForestArea}</p>
                <p>FSA Physical Location: {forestInfo.fsaPhysicalLocation}</p>
                <p>Past CSAF Practice: {forestInfo.pastCSAFPractice}</p>
                {/* Add more details as needed */}
            </div>

        </div>
    );
};

export default ReviewApplication;
