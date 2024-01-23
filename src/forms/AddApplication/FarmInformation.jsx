import React, { useState, useEffect } from 'react';
// import axios from 'axios';

function FarmInformation({FarmDetailsData, farmDetailsForm, setFarmDetailsForm, onPrevious, onNext }) {

    
    

    const [farmDetailsRows, setFarmDetailsRows] = useState(farmDetailsForm.length > 0 ? farmDetailsForm : FarmDetailsData); // State to store the farm details rows
    // Handle input changes for a specific row
    const handleChange = (e, index) => {
        const updatedFarmDetailsRows = [...farmDetailsRows];
        updatedFarmDetailsRows[index] = {
            ...updatedFarmDetailsRows[index],
            [e.target.name]: e.target.value,
        };
        setFarmDetailsRows(updatedFarmDetailsRows);
        setFarmDetailsForm(updatedFarmDetailsRows);
    };

    console.log("farmDetailsRows", farmDetailsRows);
    // Handle Next button click
    const handleNext = () => {
        onNext(); // Pass the farmInfo state to the parent component or next screen
    };

    return (
        <div className="screen-one">
            <h1>Farm Information</h1>
            <table>
                <thead>
                    <tr>
                        <th>Farm ID</th>
                        <th>Application Acres</th>
                        <th>Total Land Area (Acres)</th>
                        <th>Total Cropland (Acres)</th>
                        <th>Do you produce livestock on this Farm?</th>
                    </tr>
                </thead>
                <tbody>
                    {farmDetailsRows.map((farm, index) => (
                        <tr key={index}>
                            <td>
                                {farmDetailsRows[index]?.farmNumber}
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="applicationAcres"
                                    value={farm.applicationAcres}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Application Acres"
                                />
                            </td>
                            <td>
                                <select
                                    name="totalLandArea"
                                    value={farm.totalLandArea}
                                    onChange={(e) => handleChange(e, index)}
                                >
                                    <option value="">Select Total Land Area</option>
                                    <option value="Less than 1 acre">Less than 1 acre</option>
                                    <option value="1 to 9 acres">1 to 9 acres</option>
                                    <option value="10 to 49 acres">10 to 49 acres</option>
                                    {/* Add other options here */}
                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="totalCropland"
                                    value={farm.totalCropland}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Total Cropland"
                                />
                            </td>
                            <td>
                                <select
                                    name="produceLivestock"
                                    value={farm.produceLivestock}
                                    onChange={(e) => handleChange(e, index)}
                                >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={onPrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
}

export default FarmInformation;
