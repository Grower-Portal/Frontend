import React, { useState } from 'react';

function ScreenThree({ farms, setFarms, onPrevious, onNext }) {
    const [showHelp, setShowHelp] = useState(false);
    

    const handleChange = (e, farmIndex, tractIndex, fieldName) => {
        const updatedFarms = [...farms];
        updatedFarms[farmIndex].tracts[tractIndex][fieldName] = e.target.value;
        setFarms(updatedFarms);
    };

    const toggleHelpText = () => {
        setShowHelp(!showHelp);
    };


    return (
        <div className="form-screen">
            <h1>CSAF Practice Histories</h1>
            <table>
                <thead>
                    <tr>
                        <th>Farm ID</th>
                        <th>Field Name</th>
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
                                    <span className="help-trigger" onClick={toggleHelpText}>Help</span>
                                    {showHelp && (
                                        <div className="help-text">
                                            Prior to enrollment, had this (these) CSAF practice(s) been used in this field in the past 3 years? 
                                            Enter yes if all of the practices had been used previously in this field; 
                                            enter some if multiple practices are being implemented and one or another, but not all of the practices had been used previously in this field; 
                                            and enter no if none of the practices had been used previously in this field.
                                        </div>
                                    )}
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

export default ScreenThree;
