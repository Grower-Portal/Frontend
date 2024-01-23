import React, { useState } from 'react';
import Info from '../../components/Info';

function CSAFPracticeHistories({ farms, setFarms, onPrevious, onNext }) {
    

    const handleChange = (e, farmIndex, tractIndex, fieldName) => {
        const updatedFarms = [...farms];
        updatedFarms[farmIndex].tracts[tractIndex][fieldName] = e.target.value;
        setFarms(updatedFarms);
    };


    return (
        <div className="form-screen">
            <h1>CSAF Practice Histories</h1>
            <table>
                <thead>
                    <tr>
                        <th>Farm ID</th>
                        <th>
                        <Info
                            label={`Field Name`}
                            infoText={`What is the "common field name"\n
                            assigned to this land unit by the grower?\n
                            This will be used to group Field IDs\n
                            according to grower's nomenclature`}  
                        />
                        </th>
                        <th>Field CSAF Practice History</th>
                        <th>Past CSAF Practice History</th>
                    </tr>
                </thead>
                <tbody>
                    {farms.map((farm, farmIndex) => (
                        farm.tracts.map((tract, tractIndex) => (
                            <tr key={`${farmIndex}-${tractIndex}`}>
                                {tractIndex === 0 && (
                                    <td rowSpan={farm.tracts.length || 1}>{farm.farmNumber}</td>
                                )}
                                <td>{tract.tractNumber}</td>
                                <td>
                                    <select 
                                        value={tract.csafPracticeHistory || "I don't know"}
                                        onChange={(e) => handleChange(e, farmIndex, tractIndex, 'csafPracticeHistory')}>
                                        <option value="yes">yes</option>
                                        <option value="no">no</option>
                                        <option value="I don't know">I don't know</option>
                                        {/* Additional options as needed */}
                                    </select>
                                </td>
                                <td>
                                    <select 
                                        value={tract.pastCsafPracticeHistory || "I don't know"}
                                        onChange={(e) => handleChange(e, farmIndex, tractIndex, 'pastCsafPracticeHistory')}>
                                        <option value="I don't know">I don't know</option>
                                        <option value="Yes">Yes</option>
                                        <option value="Some">Some</option>
                                        <option value="No">No</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
            <button onClick={onPrevious}>Previous</button>
            <button className="button" onClick={onNext}>Next</button>
        </div>
    );
}

export default CSAFPracticeHistories;
