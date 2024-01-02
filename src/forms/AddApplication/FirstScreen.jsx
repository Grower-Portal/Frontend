import React, { useState, useEffect } from 'react';

// SVG Icons for Add and Remove
const AddIcon = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v4h4v2h-4v4h-2v-4H7v-2h4z" />
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

function FirstScreen({ onPrevious, onNext }) {
  const [rows, setRows] = useState([]);
  const [fieldNames, setFieldNames] = useState([]);

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
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const handleCLUChange = (index, cluIndex, field, value) => {
    const newRows = [...rows];
    newRows[index].clus[cluIndex][field] = value;
    setRows(newRows);

    if (field === 'fieldName' && value && !fieldNames.includes(value)) {
      setFieldNames([...fieldNames, value]);
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
              <th>Field Name</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <input 
                    type="text"
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
                    type="text"
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
                    <div key={cluIndex}>
                      <input 
                        type="text"
                        value={clu.fieldClu}
                        onChange={(e) => handleCLUChange(index, cluIndex, 'fieldClu', e.target.value)}
                      />
                      {index === rows.length - 1 && (
                        <AddIcon onClick={addFieldCLU} />
                      )}
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
                        list="fieldNameList"
                        type="text"
                        value={clu.fieldName}
                        onChange={(e) => handleCLUChange(index, cluIndex, 'fieldName', e.target.value)}
                      />
                    </div>
                  ))}
                </td>
                <td>
                
                {index === rows.length - 1 ? (
                    <RemoveIcon onClick={() => removeRow(index)} />
                    ) : null}
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

export default FirstScreen;
