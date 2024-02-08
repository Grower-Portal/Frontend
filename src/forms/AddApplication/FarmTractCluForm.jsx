import React, { useState, useEffect, useCallback } from 'react';
import Info from '../../components/Info';


// SVG Icons for Add and Remove
const AddIcon = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 48 48"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v4h4v2h-4v4h-2v-4H7v-2h4z" />
  </svg>
);

const SearchIcon = ({ onClick }) => (
  <svg xmlns="http://www.w3.org/2000/svg"
  width="24" height="24" viewBox="0 0 24 24"
  fill="none" stroke="currentColor" 
  stroke-width="2" stroke-linecap="round" 
  stroke-linejoin="round"
  onClick={onClick}
  style={{ cursor: 'pointer' }}>
  <circle cx="8" cy="8" r="5"></circle>
  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
</svg>
);

const RemoveIcon = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 13H5v-2h14v2z" />
  </svg>
);

function FarmTractCluForm({ rows, setRows, farms, setFarms, onPrevious, onNext }) {
  const [fieldNames, setFieldNames] = useState([]);

  console.log("farms: ", rows);

  const addFarm = () => {
    setRows([...rows, { farmNumber: '', tractNumber: '', clus: [{ fieldClu: '', acres: '', fieldName: '' }] }]);
  };

  const addTract = () => {
    if (!rows.length || !rows[rows.length - 1].farmNumber) {
      alert("Please add a farm first.");
      return;
    }
    const lastFarmNumber = rows[rows.length - 1].farmNumber;
    setRows([...rows, { farmNumber: lastFarmNumber, tractNumber: '', clus: [{ fieldClu: '', acres: '', fieldName: '' }], readOnlyFarmNumber: true }]);
  };

  const addFieldCLU = () => {
    if (!rows.length || !rows[rows.length - 1].tractNumber) {
      alert("Please add a tract first.");
      return;
    }
    // Copy last farm and tract number
    const lastRow = rows[rows.length - 1];
    setRows([...rows, { farmNumber: lastRow.farmNumber, tractNumber: lastRow.tractNumber, clus: [{ fieldClu: '', acres: '', fieldName: '' }], readOnlyFarmNumber: true, readOnlyTractNumber: true }]);
  };

  const removeRow = (index) => {
    console.log("Removing row at index:", index);
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const fetchCluCalculatedAcreage = useCallback(async (farmNumber, tractNumber, cluNumber, index, cluIndex) => {
    try {
      // Check if acres and fetchingAcreage flag are already set
      if (rows[index].clus[cluIndex].acres || rows[index].clus[cluIndex].fetchingAcreage) {
        return; // Skip fetching if already available or in progress
      }

      // Set the fetchingAcreage flag to true
      const newRows = [...rows];
      newRows[index].clus[cluIndex].fetchingAcreage = true;
      setRows(newRows);
      
      const response = await fetch(`http://grower-portal-412701.uc.r.appspot.com/api/clula/findCluCalculatedAcreage?farmNumber=${farmNumber}&tractNumber=${tractNumber}&cluNumber=${cluNumber}`, {
        method: 'GET',
        headers: {
          'accept': '*/*',
        },
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          // If the response is JSON, parse it as JSON
          const data = await response.json();
          const newRows = [...rows];
          // newRows[index].clus[cluIndex].acres = data.acres; // Update Acres field
          newRows[index].clus[cluIndex].acres = data; // Update FSA Physical Location field
          setRows(newRows);
        } else {
          // Handle non-JSON responses (e.g., plain text)
          const textData = await response.text();
          const newRows = [...rows];
          newRows[index].clus[cluIndex].acres = textData; // Update Acres field with plain text
          //newRows[index].clus[cluIndex].fsaPhysicalLocation = textData; // Update FSA Physical Location field with plain text
          setRows(newRows);
        }
      } else {
        console.error('Failed to fetch Clu Calculated Acreage');
      }
    } catch (error) {
      console.error('Error fetching Clu Calculated Acreage:', error);
    }
  }, [rows, setRows]);


  const fetchFsaPhysicalLocation = useCallback(async (farmNumber, tractNumber, cluNumber, index, cluIndex) => {
    try {
       // Check if fsaPhysicalLocation and fetchingFsaLocation flag are already set
    if (rows[index].clus[cluIndex].fsaPhysicalLocation || rows[index].clus[cluIndex].fetchingFsaLocation) {
      return; // Skip fetching if already available or in progress
    }

    console.log("Fetching CLU Number: ", cluNumber);

    // Set the fetchingFsaLocation flag to true
    const newRows = [...rows];
    newRows[index].clus[cluIndex].fetchingFsaLocation = true;
    setRows(newRows);
      const response = await fetch(`http://grower-portal-412701.uc.r.appspot.com/api/clula/findFsaPhysicalLocation?farmNumber=${farmNumber}&tractNumber=${tractNumber}&cluNumber=${cluNumber}`);
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          // If the response is JSON, parse it as JSON
          const data = await response.json();
          const newRows = [...rows];
          // newRows[index].clus[cluIndex].acres = data.acres; // Update Acres field
          newRows[index].clus[cluIndex].fsaPhysicalLocation = data.fsaPhysicalLocation; // Update FSA Physical Location field
          setRows(newRows);
        } else {
          // Handle non-JSON responses (e.g., plain text)
          const textData = await response.text();
          const newRows = [...rows];
         // newRows[index].clus[cluIndex].acres = textData; // Update Acres field with plain text
          newRows[index].clus[cluIndex].fsaPhysicalLocation = textData; // Update FSA Physical Location field with plain text
          setRows(newRows);
        }
      } else {
        console.error('Failed to fetch FSA Physical Location');
      }
    } catch (error) {
      console.error('Error fetching FSA Physical Location', error);
    }
  },[rows, setRows]);

  const handleCLUChange = (index, cluIndex, field, value) => {
    const newRows = [...rows];
    newRows[index].clus[cluIndex][field] = value;
    setRows(newRows);

    if (field === 'fieldName' && value && !fieldNames.includes(value)) {
      setFieldNames([...fieldNames, value]);
    }
  };


  const handleSearchClick = (index, cluIndex) => {
    const farmNumber = rows[index].farmNumber;
    const tractNumber = rows[index].tractNumber;
    const cluNumber = rows[index].clus[cluIndex].fieldClu;
  
    if (farmNumber && tractNumber && cluNumber) {
      fetchFsaPhysicalLocation(farmNumber, tractNumber, cluNumber, index, cluIndex);
      fetchCluCalculatedAcreage(farmNumber, tractNumber, cluNumber, index, cluIndex);
    }
  };

  useEffect(() => {
    const newFieldNames = rows.flatMap(row => row.clus.map(clu => clu.fieldName)).filter((value, index, self) => value && self.indexOf(value) === index);
    setFieldNames(newFieldNames);
  }, [rows]);

  

  return (
    <div className="form-screen">
      <h1>Farm and Tract Details</h1>
      <div className="container">
        <table id="farmTable">
          <thead>
            <tr className='row-container'>
              <th>Farm ID</th>
              <th>Tract ID</th>
              <th>Field ID</th>
              <th>Acres</th>
              <th>FSA Physical Location</th>
              <th>
              <Info
                label={`Field Name`}
                infoText={`What is the "common field name"\n
                assigned to this land unit by the grower?\n
                This will be used to group Field IDs\n
                according to grower's nomenclature`}  
              />
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <input 
                    type="Number"
                    value={row.farmNumber}
                    onChange={(e) => handleInputChange(index, 'farmNumber', e.target.value)}
                    readOnly={row.readOnlyFarmNumber}
                  />
                  {index === rows.length - 1 && (
                    <AddIcon onClick={addFarm} />
                  )}
                </td>
                <td>
                  <input 
                    type="Number"
                    value={row.tractNumber}
                    onChange={(e) => handleInputChange(index, 'tractNumber', e.target.value)}
                    readOnly={row.readOnlyTractNumber}
                  />
                  {index === rows.length - 1 && (
                    <AddIcon onClick={addTract} />
                  )}
                </td>
                <td>
                  {row.clus.map((clu, cluIndex) => (
                  <div key={cluIndex} style={{ display: 'flex', alignItems: 'center' }}>
                    <input 
                      type="Number"
                      value={clu.fieldClu}
                      onChange={(e) => handleCLUChange(index, cluIndex, 'fieldClu', e.target.value)}
                    />
                    {index === rows.length - 1 && (
                        <AddIcon onClick={addFieldCLU} />
                      )}
                    <SearchIcon onClick={() => handleSearchClick(index, cluIndex)} />
                  </div>
                ))}
                </td>
                <td>
                  {row.clus.map((clu, cluIndex) => (
                    <div key={cluIndex}>
                      <input 
                        type="text"
                        value={clu.acres}
                        onChange={(e) => handleCLUChange(index, cluIndex, 'acres', e.target.value)}
                      />
                    </div>
                  ))}
                </td>
                <td>
                  {row.clus.map((clu, cluIndex) => (
                    <div key={cluIndex}>
                      <input
                        type="text"
                        value={clu.fsaPhysicalLocation}
                        onChange={(e) => handleCLUChange(index, cluIndex, 'fsaPhysicalLocation', e.target.value)}
                        />
                    </div>
                  ))}
                </td>
                <td>
                  {row.clus.map((clu, cluIndex) => (
                    <div key={cluIndex}>
                      <input 
                        list="fieldNameList"
                        type="text"
                        value={clu.fieldName}
                        onChange={(e) => handleCLUChange(index, cluIndex, 'fieldName', e.target.value)}
                      />
                    </div>
                  ))}
                </td>
                
                <td>
                  {/* Remove Icon for each row */}
                  <RemoveIcon onClick={() => removeRow(index)} />
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        {/* Add an "Add" button outside the table */}
        {rows.length === 0 && (
            <button onClick={addFarm}>
                Add Farm
            </button>
        )}
        <datalist id="fieldNameList">
          {fieldNames.map((name, index) => (
            <option key={index} value={name} />
          ))}
        </datalist>
      </div>
      <div className="navigation-buttons">
        <button className="button" onClick={onPrevious}>Previous</button>
        <button className="button" onClick={onNext}>Next</button>
      </div>
    </div>
  );
}

export default FarmTractCluForm;
