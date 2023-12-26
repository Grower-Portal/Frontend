import React, { useState } from 'react';

function FourthScreen({ farms, onPrevious, onNext }) {
    const [farmInfo, setFarmInfo] = useState({
        applicationAcres: '',
        totalLandArea: '',
        produceLivestock: 'No',
    });

    // Handle input changes
    const handleChange = (e) => {
        setFarmInfo({ ...farmInfo, [e.target.name]: e.target.value });
    };

    // Handle Next button click
    const handleNext = () => {
        onNext(farmInfo); // Pass the farmInfo state to the parent component or next screen
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
                        <th>Do you produce livestock on this Farm?</th>
                    </tr>
                </thead>
                <tbody>
                    {farms.map((farm, index) => (
                        <tr key={index}>
                            <td>{farm.farmNumber}</td>
                            <td>
                                <input
                                    type="number"
                                    name="applicationAcres"
                                    value={farmInfo.applicationAcres}
                                    onChange={handleChange}
                                    placeholder="Enter Application Acres"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="totalLandArea"
                                    value={farmInfo.totalLandArea}
                                    onChange={handleChange}
                                    placeholder="Enter Total Land Area"
                                />
                            </td>
                            <td>
                                <select
                                    name="produceLivestock"
                                    value={farmInfo.produceLivestock}
                                    onChange={handleChange}
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

export default FourthScreen;
