import React from 'react';

function Review({
    producerInfo,
    rows,
    farms,
    commodityForm,
    farmDetailsForm,
    formData
}) {
    return (
        <div className="review-container">
            <h2>Review Your Application</h2>

            <div>
                <h3>Producer Information</h3>
                <p><strong>Producer Name:</strong> {producerInfo.producerName}</p>
                <p><strong>Producer Entity Name:</strong> {producerInfo.producerEntityName}</p>
                <p><strong>County of Residence:</strong> {producerInfo.countyOfResidence}</p>
                <p><strong>Producer Address:</strong> {producerInfo.producerAddress}</p>
                <p><strong>Is Underserved Small Producer:</strong> {producerInfo.isUnderservedSmallProducer}</p>
                <p><strong>Baseline Yield:</strong> {producerInfo.baselineYield}</p>
                <p><strong>Primary Reason For Applying:</strong> {producerInfo.primaryReasonForApplying}</p>
                <p><strong>Implemented CSAF Practices:</strong> {producerInfo.implementedCsafPractices}</p>
            </div>

            <div>
                <h3>Rows</h3>
                {rows.map((row, index) => (
                    <div key={index}>
                        <p><strong>Farm Number:</strong> {row.farmNumber}</p>
                        <p><strong>Field CLU:</strong> {row.clus.map(clu => clu.fieldClu).join(', ')}</p>
                        <p><strong>Acres:</strong> {row.clus.map(clu => clu.acres).join(', ')}</p>
                        <p><strong>Field Name:</strong> {row.clus.map(clu => clu.fieldName).join(', ')}</p>
                    </div>
                ))}
            </div>

            <div>
                <h3>Farms</h3>
                {farms.map((farm, index) => (
                    <div key={index}>
                        <p><strong>Farm Number:</strong> {farm.farmNumber}</p>
                        {farm.tracts.map((tract, tractIndex) => (
                            <div key={tractIndex}>
                                <p><strong>Tract Number:</strong> {tract.tractNumber}</p>
                                {tract.clus.map((clu, cluIndex) => (
                                    <div key={cluIndex}>
                                        <p><strong>Field CLU:</strong> {clu.fieldClu}</p>
                                        <p><strong>Acres:</strong> {clu.acres}</p>
                                        <p><strong>Field Name:</strong> {clu.fieldName}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div>
                <h3>Commodity Information</h3>
                {commodityForm.map((commodity, index) => (
                    <div key={index}>
                        {/* Display commodity data */}
                        <p><strong>Farm Number:</strong> {commodity.farmNumber}</p>
                        <p><strong>Tract Number:</strong> {commodity.tractNumber}</p>
                        <p><strong>CLU:</strong> {commodity.clu}</p>
                        <p><strong>Acres:</strong> {commodity.acres}</p>
                        <p><strong>Commodity Category:</strong> {commodity.commodityCategory}</p>
                        <p><strong>Commodity Type:</strong> {commodity.commodityType}</p>
                        <p><strong>Field Land Use History:</strong> {commodity.fieldLandUseHistory}</p>
                        <p><strong>Field Irrigation History:</strong> {commodity.fieldIrrigationHistory}</p>
                        <p><strong>Field Tillage History:</strong> {commodity.fieldTillageHistory}</p>
                        <p><strong>Field CSAF Practice History:</strong> {commodity.fieldCsafPracticeHistory}</p>
                        <p><strong>Past CSAF Practice History:</strong> {commodity.pastCsafPracticeHistory}</p>
                    </div>
                ))}
            </div>

            <div>
                <h3>Farm Details</h3>
                {farmDetailsForm.map((detail, index) => (
                    <div key={index}>
                        <p><strong>Farm Number:</strong> {detail.farmNumber}</p>
                        <p><strong>Application Acres:</strong> {detail.applicationAcres}</p>
                        <p><strong>Total Cropland:</strong> {detail.totalCropland}</p>
                        <p><strong>Total Land Area:</strong> {detail.totalLandArea}</p>
                        <p><strong>Produce Livestock:</strong> {detail.produceLivestock}</p>
                        <p><strong>Livestock Type 1:</strong> {detail.livestockType1}</p>
                        <p><strong>Livestock Head 1:</strong> {detail.livestockHead1}</p>
                        <p><strong>Livestock Type 2:</strong> {detail.livestockType2}</p>
                        <p><strong>Livestock Head 2:</strong> {detail.livestockHead2}</p>
                        <p><strong>Livestock Type 3:</strong> {detail.livestockType3}</p>
                        <p><strong>Livestock Head 3:</strong> {detail.livestockHead3}</p>
                        <p><strong>Total Forest Area:</strong> {detail.totalForestArea}</p>
                        <p><strong>FSA Physical Location:</strong> {detail.fsaPhysicalLocation}</p>
                        <p><strong>Past CSAF Practice:</strong> {detail.pastCSAFPractice}</p>
                    </div>
                ))}
            </div>

            <div>
                <h3>Additional Form Data</h3>
                <p><strong>Controlling Members:</strong> {formData.controllingMembers}</p>
                <p><strong>CCC-860 Certification:</strong> {formData.ccc860Certification}</p>
                <p><strong>CCC-860 Members:</strong> {formData.ccc860Members}</p>
                <p><strong>Participated in LSU Master Farmer:</strong> {formData.participatedInLSUMasterFarmer}</p>
                <p><strong>LSU Master Farmer Participants:</strong> {formData.lSUMasterFarmerParticipants}</p>
                <p><strong>Highest Degree of Participation:</strong> {formData.highestDegreeOfParticipation}</p>
                <p><strong>Years of Experience:</strong> {formData.yearsOfExperience}</p>
                <p><strong>Farmed Rice in 2023:</strong> {formData.farmedRiceIn2023}</p>
                <p><strong>Rice Acres in 2023:</strong> {formData.riceAcres2023}</p>
                <p><strong>First Year Farming Rice:</strong> {formData.firstYearFarmingRice}</p>
                <p><strong>Last Year Farmed Rice:</strong> {formData.lastYearFarmedRice}</p>
                <p><strong>Rice Acres Last Year:</strong> {formData.riceAcresLastYear}</p>
                <p><strong>Income Percentage:</strong> {formData.incomePercentage}</p>
                <p><strong>Participate in SDD Study:</strong> {formData.participateInSDDStudy}</p>
                <p><strong>Agreement with Supreme Rice:</strong> {formData.agreementWithSupremeRice}</p>
                <p><strong>Understanding of Funding Prohibition:</strong> {formData.understandingOfFundingProhibition}</p>
                <p><strong>Agreement on AWD or SDD Payment:</strong> {formData.agreementOnAWDorSDDPayment}</p>
                <p><strong>Authority to Complete Application:</strong> {formData.authorityToCompleteApplication}</p>
            </div>
        </div>
    );
}

export default Review;
