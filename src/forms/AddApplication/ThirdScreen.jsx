import React, { useState } from 'react';

function ScreenThree({ farms, setFarms, onPrevious }) {
    const [showHelp, setShowHelp] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e, farmIndex, tractIndex, fieldName) => {
        const updatedFarms = [...farms];
        updatedFarms[farmIndex].tracts[tractIndex][fieldName] = e.target.value;
        setFarms(updatedFarms);
    };

    const toggleHelpText = () => {
        setShowHelp(!showHelp);
    };

    const handleSubmit = () => {
        const confirmMessage = "Submit Application means you have checked every detail you have entered in the application, and you are confirming the details are true in nature. Do you want to submit the application?";
        const isConfirmed = window.confirm(confirmMessage);
        if (isConfirmed) {
            onSubmit(); // You can pass the farms data to this function if needed
        }
    };

    const onSubmit = () => {
        // Logic to handle the actual submission, e.g., sending data to a server
        // After successful submission:
        setSubmissionMessage("Application Submitted for Verification and Approval");
        setIsSubmitted(true);  // Update the submission state
    };


    return (
        <div className="form-screen">
            <h1>CSAF Practice Histories</h1>
            <table>
                <thead>
                    <tr>
                        <th>Farm Number</th>
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
            {submissionMessage && <div className="submission-message">{submissionMessage}</div>}
            {!isSubmitted && <button onClick={onPrevious}>Previous</button>}
            {!isSubmitted && <button onClick={handleSubmit}>Submit Application</button>}
        </div>
    );
}

export default ScreenThree;
