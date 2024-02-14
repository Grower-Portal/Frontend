import React, { useState } from 'react';

function ForestInformation({ FarmDetailsData, farmDetailsForm, setFarmDetailsForm, onPrevious, onNext }) {
  
  const [forestRows, setForestRows] = useState(farmDetailsForm.length > 0 ? farmDetailsForm : FarmDetailsData); // State to store the farm details rows
  

  const handleChange = (e, index) => {
    const updatedForestRows = [...forestRows];
    updatedForestRows[index] = {
        ...updatedForestRows[index],
        [e.target.name]: e.target.value,
    };
    setForestRows(updatedForestRows);
    setFarmDetailsForm(updatedForestRows);
};


  // Handle Previous button click
  const handlePrevious = () => {
    onPrevious(); // Go back to the previous screen
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
            <th>Is Any Portion of the Farm Currently or Transitioning to USDA-Certified Organic?</th>
          </tr>
        </thead>
        <tbody>
          {forestRows.map((farm, index) => (
            <tr key={index}>
              <td>{forestRows[index]?.farmNumber}</td>
              <td>
                <input
                  type="text"
                  name={`totalForestAreaAcres`}
                  value={farm.totalForestAreaAcres}
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
                  name={`pastCsafPractice`}
                  value={farm.pastCsafPractice}
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
                <select
                  name={`transitioningToUsdaCertified`}
                  value={farm.transitioningToUsdaCertified}
                  onChange={(e) => handleChange(e, index)}
                >
                  {/* Options here */}
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="I don't know">I don't know</option>
                </select>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevious}>Previous</button>
      <button className="button" onClick={onNext}>Next</button>
    </div>
  );
}

export default ForestInformation;










