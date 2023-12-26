import React, { useState } from 'react';

function ScreenFive({ farms, onPrevious, onNext }) {
  const [livestockInfo, setLivestockInfo] = useState({
    livestockType1: '',
    livestockHead1: '',
    livestockType2: '',
    livestockHead2: '',
    livestockType3: '',
    livestockHead3: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setLivestockInfo({ ...livestockInfo, [e.target.name]: e.target.value });
  };

  // Handle Next button click
  const handleNext = () => {
    onNext(livestockInfo); // Pass the livestockInfo to the next screen or parent component
  };

  // Handle Previous button click
  const handlePrevious = () => {
    onPrevious(); // Go back to the previous screen
  };

  return (
    <div className="form-screen">
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
          {farms.map((farm, farmIndex) => (
            <tr key={farmIndex}>
              <td>{farm.farmNumber}</td>
              <td>
                <select
                  name={`livestockType1`}
                  value={livestockInfo.livestockType1}
                  onChange={handleChange}
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
                  value={livestockInfo.livestockHead1}
                  onChange={handleChange}
                />
              </td>
              <td>
                {farm.totalLivestockAreaAcres === 0 ? null : (
                  <select
                    name={`livestockType2`}
                    value={livestockInfo.livestockType2}
                    onChange={handleChange}
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
                    value={livestockInfo.livestockHead2}
                    onChange={handleChange}
                  />
                )}
              </td>
              <td>
                {livestockInfo.livestockType2 ? (
                  <select
                    name={`livestockType3`}
                    value={livestockInfo.livestockType3}
                    onChange={handleChange}
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
                {livestockInfo.livestockType2 ? (
                  <input
                    type="text"
                    name={`livestockHead3`}
                    value={livestockInfo.livestockHead3}
                    onChange={handleChange}
                  />
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default ScreenFive;
