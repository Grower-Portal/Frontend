import React, { useState } from 'react';

function ForestInformation({ FarmDetailsData, farmDetailsForm, setFarmDetailsForm, onPrevious, onNext }) {
  
  const [forestRows, setForestRows] = useState(farmDetailsForm.length > 0 ? farmDetailsForm : FarmDetailsData); // State to store the farm details rows
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e, index) => {
    const updatedForestRows = [...forestRows];
    updatedForestRows[index] = {
        ...updatedForestRows[index],
        [e.target.name]: e.target.value,
    };
    setForestRows(updatedForestRows);
    setFarmDetailsForm(updatedForestRows);
};

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForestRows({ ...forestRows, uploadedDocument: file });
  };

  // Handle Next button click
  const handleNext = () => {
    onNext(forestRows); // Pass the forestInfo to the next screen or parent component
  };

  // Handle Previous button click
  const handlePrevious = () => {
    onPrevious(); // Go back to the previous screen
  };

  // Handle Submit button click
  const handleSubmit = () => {
    const confirmMessage =
      "Submit Application means you have checked every detail you have entered in the application, and you are confirming the details are true in nature. Do you want to submit the application?";
    const isConfirmed = window.confirm(confirmMessage);
    if (isConfirmed) {
      onSubmit(); // You can pass the forestInfo data to this function if needed
    }
  };

  // Handle actual submission
  const onSubmit = () => {
    // Logic to handle the actual submission, e.g., sending data to a server
    // You can also handle the uploaded document here

    // After successful submission:
    setSubmissionMessage("Application Submitted for Verification and Approval");
    setIsSubmitted(true); // Update the submission state
  };

  return (
    <div className="form-screen">
      <h1>Forest Information</h1>
      <table>
        <thead>
          <tr>
            <th>Farm ID</th>
            <th>Total Forest Area (Acres)</th>
            <th>FSA Physical Location</th>
            <th>Past CSAF Practice</th>
            <th>Upload Document</th>
          </tr>
        </thead>
        <tbody>
          {forestRows.map((farm, index) => (
            <tr key={index}>
              <td>{forestRows[index]?.farmNumber}</td>
              <td>
                <input
                  type="text"
                  name={`totalForestArea`}
                  value={farm.totalForestArea}
                  onChange={(e) => handleChange(e, index)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name={`fsaPhysicalLocation`}
                  value={farm.fsaPhysicalLocation}
                  onChange={(e) => handleChange(e, index)}
                />
              </td>
              <td>
                <select
                  name={`pastCSAFPractice`}
                  value={farm.pastCSAFPractice}
                  onChange={(e) => handleChange(e, index)}
                >
                  {/* Options here */}
                  <option value="">Select Past CSAF Practice</option>
                  <option value="Never Used">Never Used</option>
                    <option value="Used on less than 25% of operation">Used on less than 25% of operation</option>
                    <option value="Used on 25-50% of operation">Used on 25-50% of operation</option>
                    <option value="Used on 51-75% of operation">Used on 51-75% of operation</option>
                    <option value="Used on more than 75% of operation">Used on more than 75% of operation</option>
                </select>
              </td>
              <td>
                <input
                  type="file"
                  name={`uploadedDocument`}
                  accept=".pdf" // Define the accepted file types
                  onChange={(e) => handleChange(e, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {submissionMessage && (
        <div className="submission-message">{submissionMessage}</div>
      )}
      {!isSubmitted && <button onClick={handlePrevious}>Previous</button>}
      {/* <button onClick={handleNext}>Next</button> */}
      {!isSubmitted && <button onClick={handleSubmit}>Submit Application</button>}
    </div>
  );
}

export default ForestInformation;










