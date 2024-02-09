import React from 'react';

function Review({
    producerInfo,
    rows,
    commodityForm,
    farmDetailsForm,
    formData,
    onPrevious
}) {
    return (
        <div className="review-container">
            <h2>Review Your Application</h2>

            <div>
                <h3>Producer Information</h3>
                <table>
                    <tbody>
                        <tr><td><strong>Producer Name:</strong></td><td>{producerInfo.producerName}</td></tr>
                        <tr><td><strong>Producer Entity Name:</strong></td><td>{producerInfo.producerEntityName}</td></tr>
                        <tr><td><strong>County of Residence:</strong></td><td>{producerInfo.countyOfResidence}</td></tr>
                        <tr><td><strong>Producer Address:</strong></td><td>{producerInfo.producerAddress}</td></tr>
                        <tr><td><strong>Is Underserved Small Producer:</strong></td><td>{producerInfo.isUnderservedSmallProducer}</td></tr>
                        <tr><td><strong>Baseline Yield:</strong></td><td>{producerInfo.baselineYield}</td></tr>
                        <tr><td><strong>Primary Reason For Applying:</strong></td><td>{producerInfo.primaryReasonForApplying}</td></tr>
                        <tr><td><strong>Implemented CSAF Practices:</strong></td><td>{producerInfo.implementedCsafPractices}</td></tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h3>Farms</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Farm ID</th>
                                <th>Field ID</th>
                                <th>Acres</th>
                                <th>Field Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.farmNumber}</td>
                                    <td>{row.clus.map(clu => clu.fieldClu).join(', ')}</td>
                                    <td>{row.clus.map(clu => clu.acres).join(', ')}</td>
                                    <td>{row.clus.map(clu => clu.fieldName).join(', ')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>

            <div>
                <h3>Commodity Information</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Farm ID</th>
                                <th>Field Name</th>
                                <th>Report Qty</th>
                                <th>Commodity Category</th>
                                <th>Commodity Type</th>
                                <th>Field Land Use History</th>
                                <th>Field Irrigation History</th>
                                <th>Field Tillage History</th>
                                <th>Field CSAF Practice History</th>
                                <th>Past CSAF Practice History</th>
                            </tr>
                        </thead>
                        <tbody>
                            {commodityForm.map((commodity, index) => (
                                <tr key={index}>
                                    <td>{commodity.farmNumber}</td>
                                    <td>{commodity.fieldName}</td>
                                    <td>{commodity.reportQtyAcres}</td>
                                    <td>{commodity.commodityCategory}</td>
                                    <td>{commodity.commodityType}</td>
                                    <td>{commodity.fieldLandUseHistory}</td>
                                    <td>{commodity.fieldIrrigationHistory}</td>
                                    <td>{commodity.fieldTillageHistory}</td>
                                    <td>{commodity.fieldCsafPracticeHistory}</td>
                                    <td>{commodity.pastCsafPracticeHistory}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
        </div>

        <div>
            <h3>Farm Details</h3>
            <table>
                <thead>
                    <tr>
                        <th>Farm ID</th>
                        <th>Application Acres</th>
                        <th>Total Cropland</th>
                        <th>Total Land Area</th>
                        <th>Produce Livestock</th>
                        <th>Livestock Type 1</th>
                        <th>Livestock Head 1</th>
                        <th>Livestock Type 2</th>
                        <th>Livestock Head 2</th>
                        <th>Livestock Type 3</th>
                        <th>Livestock Head 3</th>
                        <th>Total Forest Area</th>
                        <th>FSA Physical Location</th>
                        <th>Past CSAF Practice</th>
                    </tr>
                </thead>
                <tbody>
                    {farmDetailsForm.map((detail, index) => (
                        <tr key={index}>
                            <td>{detail.farmNumber}</td>
                            <td>{detail.applicationAcres}</td>
                            <td>{detail.totalCropland}</td>
                            <td>{detail.totalLandArea}</td>
                            <td>{detail.produceLivestock}</td>
                            <td>{detail.livestockType1}</td>
                            <td>{detail.livestockHead1}</td>
                            <td>{detail.livestockType2}</td>
                            <td>{detail.livestockHead2}</td>
                            <td>{detail.livestockType3}</td>
                            <td>{detail.livestockHead3}</td>
                            <td>{detail.totalForestArea}</td>
                            <td>{detail.fsaPhysicalLocation}</td>
                            <td>{detail.pastCSAFPractice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

            <div>
            <h3>Additional Form Data</h3>
            <table>
                <tbody>
                    <tr>
                        <td><strong>Controlling Members:</strong></td>
                        <td>{formData.controllingMembers}</td>
                    </tr>
                    <tr>
                        <td><strong>CCC-860 Certification:</strong></td>
                        <td>{formData.ccc860Certification}</td>
                    </tr>
                    <tr>
                        <td><strong>CCC-860 Members:</strong></td>
                        <td>{formData.ccc860Members}</td>
                    </tr>
                    <tr>
                        <td><strong>Participated in LSU Master Farmer:</strong></td>
                        <td>{formData.participatedInLSUMasterFarmer}</td>
                    </tr>
                    <tr>
                        <td><strong>LSU Master Farmer Participants:</strong></td>
                        <td>{formData.lSUMasterFarmerParticipants}</td>
                    </tr>
                    <tr>
                        <td><strong>Highest Degree of Participation:</strong></td>
                        <td>{formData.highestDegreeOfParticipation}</td>
                    </tr>
                    <tr>
                        <td><strong>Years of Experience:</strong></td>
                        <td>{formData.yearsOfExperience}</td>
                    </tr>
                    <tr>
                        <td><strong>Farmed Rice in 2023:</strong></td>
                        <td>{formData.farmedRiceIn2023}</td>
                    </tr>
                    <tr>
                        <td><strong>Rice Acres in 2023:</strong></td>
                        <td>{formData.riceAcres2023}</td>
                    </tr>
                    <tr>
                        <td><strong>First Year Farming Rice:</strong></td>
                        <td>{formData.firstYearFarmingRice}</td>
                    </tr>
                    <tr>
                        <td><strong>Last Year Farmed Rice:</strong></td>
                        <td>{formData.lastYearFarmedRice}</td>
                    </tr>
                    <tr>
                        <td><strong>Rice Acres Last Year:</strong></td>
                        <td>{formData.riceAcresLastYear}</td>
                    </tr>
                    <tr>
                        <td><strong>Income Percentage:</strong></td>
                        <td>{formData.incomePercentage}</td>
                    </tr>
                    <tr>
                        <td><strong>Participate in SDD Study:</strong></td>
                        <td>{formData.participateInSDDStudy}</td>
                    </tr>
                    <tr>
                        <td><strong>Agreement with Supreme Rice:</strong></td>
                        <td>{formData.agreementWithSupremeRice}</td>
                    </tr>
                    <tr>
                        <td><strong>Understanding of Funding Prohibition:</strong></td>
                        <td>{formData.understandingOfFundingProhibition}</td>
                    </tr>
                    <tr>
                        <td><strong>Agreement on AWD or SDD Payment:</strong></td>
                        <td>{formData.agreementOnAWDorSDDPayment}</td>
                    </tr>
                    <tr>
                        <td><strong>Authority to Complete Application:</strong></td>
                        <td>{formData.authorityToCompleteApplication}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button onClick={onPrevious}>Previous</button>
        </div>

        
    );
}

export default Review;
