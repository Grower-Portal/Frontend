import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import axios from 'axios';

function FarmInformation({FarmDetailsData, farmDetailsForm, setFarmDetailsForm, onPrevious, onNext }) {

    
    
    const [totalLandAreaAcres, setTotalLandArea] = useState(null);
    const [farmDetailsRows, setFarmDetailsRows] = useState(farmDetailsForm.length > 0 ? farmDetailsForm : FarmDetailsData); // State to store the farm details rows
    // Handle input changes for a specific row
    useEffect(() => {
        // Fetch total land area when the component mounts
        if (farmDetailsRows.length > 0) {
            fetchTotalLandArea(farmDetailsRows[0]?.farmNumber); // Fetch for the first farm number
        }
    }, [farmDetailsRows]); // Fetch whenever farmDetailsRows change

    const handleChange = (e, index) => {
        const updatedFarmDetailsRows = [...farmDetailsRows];
        updatedFarmDetailsRows[index] = {
            ...updatedFarmDetailsRows[index],
            [e.target.name]: e.target.value,
        };
        setFarmDetailsRows(updatedFarmDetailsRows);
        setFarmDetailsForm(updatedFarmDetailsRows);
    };

    const fetchTotalLandArea = async (farmNumber) => {
        try {
            const response = await axios.get(`http://localhost:8080/getTotalCalculatedAcreageByFarmNumber?farmNumber=${farmNumber}`);
            setTotalLandArea(response.data); // Set the total land area from the response
        } catch (error) {
            console.error('Error fetching total land area:', error);
        }
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
                        <th>Total Live stock Area (Acres)</th>
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
                                <input
                                    type='number'
                                    name="totalLandAreaAcres"
                                    value={farm.totalLandAreaAcres = totalLandAreaAcres}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Total Land Area (Acres)"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="totalCroplandAcres"
                                    value={farm.totalCroplandAcres}
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
                            <td>
                                <input
                                    type="number"
                                    name="totalLiveStockAcres"
                                    value={farm.totalLiveStockAcres}
                                    onChange={(e) => handleChange(e, index)}
                                    placeholder="Enter Total Livestock Area (Acres)"
                                />
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
