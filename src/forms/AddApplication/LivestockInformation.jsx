import React, { useState } from 'react';

function LivestockInformation({ FarmDetailsData, farmDetailsForm, setFarmDetailsForm, onPrevious, onNext }) {
  
  const [livestockRows, setLivestockRows] = useState(farmDetailsForm.length > 0 ? farmDetailsForm : FarmDetailsData); // State to store the livestock information
  // Handle input changes
  const handleChange = (e, index) => {
    const updatedLivestockRows = [...livestockRows];
    updatedLivestockRows[index] = {
        ...updatedLivestockRows[index],
        [e.target.name]: e.target.value,
    };
    setLivestockRows(updatedLivestockRows);
    setFarmDetailsForm(updatedLivestockRows);
};

  

  // // Handle Next button click
  // const handleNext = () => {
  //   onNext(farmDetailsRows); // Pass the livestockInfo to the next screen or parent component
  // };

  // // Handle Previous button click
  // const handlePrevious = () => {
  //   onPrevious(); // Go back to the previous screen
  // };

  return (
    <div className="LiveStock-Information-form">
      <h1>Livestock Information</h1>
      <table>
        <thead>
          <tr>
            <th>Farm ID</th>
            <th>Livestock Type 1</th>
            <th>Livestock Head 1</th>
            <th>Livestock Type 2</th>
            <th>Livestock Head 2</th>
            <th>Livestock Type 3</th>
            <th>Livestock Head 3</th>
          </tr>
        </thead>
        <tbody>
          {livestockRows.map((farm, index) => (
            <tr key={index}>
              <td>{livestockRows[index]?.farmNumber}</td>
              <td>
                <select
                  name={`livestockType1`}
                  value={farm.livestockType1}
                  onChange={(e) => handleChange(e, index)}
                >
                  <option value="">Select Livestock Type</option>
                  <option value="Beef Cows">Beef Cows</option>
                  <option value="Dairy Cows">Dairy Cows</option>
                  <option value="Pigs">Pigs</option>
                  <option value="Sheep">Sheep</option>
                  <option value="Goats">Goats</option>
                  <option value="Poultry">Poultry</option>
                  <option value="Other">Other</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name={`livestockHead1`}
                  value={farm.livestockHead1}
                  onChange={(e) => handleChange(e, index)}
                />
              </td>
              <td>
                {farm.totalLivestockAreaAcres === 0 ? null : (
                  <select
                    name={`livestockType2`}
                    value={farm.livestockType2}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="">Select Livestock Type</option>
                    <option value="Alpacas">Alpacas</option>
                    <option value="Beef Cows">Beef Cows</option>
                    <option value="Beefalo">Beefalo</option>
                    <option value="Buffalo or bison">Buffalo or bison</option>
                    <option value="Chickens (broilers)">Chickens (broilers)</option>
                    <option value="Chickens (layers)">Chickens (layers)</option>
                    <option value="Dairy Cows">Dairy Cows</option>
                    <option value="Deer">Deer</option>
                    <option value="Ducks">Ducks</option>
                    <option value="Elk">Elk</option>
                    <option value="Emus">Emus</option>
                    <option value="Equine">Equine</option>
                    <option value="Geese">Geese</option>
                    <option value="Goats">Goats</option>
                    <option value="Honeybees">Honeybees</option>
                    <option value="Llamas">Llamas</option>
                    <option value="Reindeer">Reindeer</option>
                    <option value="Sheep">Sheep</option>
                    <option value="Swine">Swine</option>
                    <option value="Turkeys">Turkeys</option>
                    {/* Add other options based on your requirements */}
                  </select>
                )}
              </td>
              <td>
                {farm.totalLivestockAreaAcres === 0 ? null : (
                  <input
                    type="text"
                    name={`livestockHead2`}
                    value={farm.livestockHead2}
                    onChange={(e) => handleChange(e, index)}
                  />
                )}
              </td>
              <td>
                {farm.livestockType2 ? (
                  <select
                    name={`livestockType3`}
                    value={farm.livestockType3}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="">Select Livestock Type</option>
                    {/* Add options based on the selection of livestockType2 */}
                    <option value="Alpacas">Alpacas</option>
                    <option value="Beef Cows">Beef Cows</option>
                    <option value="Beefalo">Beefalo</option>
                    <option value="Buffalo or bison">Buffalo or bison</option>
                    <option value="Chickens (broilers)">Chickens (broilers)</option>
                    <option value="Chickens (layers)">Chickens (layers)</option>
                    <option value="Dairy Cows">Dairy Cows</option>
                    <option value="Deer">Deer</option>
                    <option value="Ducks">Ducks</option>
                    <option value="Elk">Elk</option>
                    <option value="Emus">Emus</option>
                    <option value="Equine">Equine</option>
                    <option value="Geese">Geese</option>
                    <option value="Goats">Goats</option>
                    <option value="Honeybees">Honeybees</option>
                    <option value="Llamas">Llamas</option>
                    <option value="Reindeer">Reindeer</option>
                    <option value="Sheep">Sheep</option>
                    <option value="Swine">Swine</option>
                    <option value="Turkeys">Turkeys</option>

                    

                  </select>
                ) : null}
              </td>
              <td>
                {farm.livestockType2 ? (
                  <input
                    type="text"
                    name={`livestockHead3`}
                    value={farm.livestockHead3}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onPrevious}>Previous</button>
      <button className="button" onClick={onNext}>Next</button>
    </div>
  );
}

export default LivestockInformation;
