import React from 'react';

function ScreenTwo({ farms, setFarms, onPrevious, onNext }) {
    const handleChange = (e, farmIndex, tractIndex, fieldName) => {
        const updatedFarms = [...farms];
        updatedFarms[farmIndex].tracts[tractIndex][fieldName] = e.target.value;
        setFarms(updatedFarms);
    };

    return (
        <div className="form-screen">
            <h1>Field Histories</h1>
            <table>
                <thead>
                    <tr>
                        <th>Farm ID</th>
                        <th>Field Name</th>
                        <th>Field Land Use History</th>
                        <th>Field Irrigation History</th>
                        <th>Field Tillage History</th>
                    </tr>
                </thead>
                <tbody>
                    {farms.map((farm, farmIndex) => (
                        farm.tracts.map((tract, tractIndex) => (
                            <tr key={`${farmIndex}-${tractIndex}`}>
                                {tractIndex === 0 && (
                                    <td rowSpan={farm.tracts.length || 1}>
                                        {farm.farmNumber}
                                    </td>
                                )}
                                <td>{tract.tractNumber}</td>
                                <td>
                                    <select 
                                        value={tract.landUseHistory || 'Cropland'}
                                        onChange={(e) => handleChange(e, farmIndex, tractIndex, 'landUseHistory')}>
                                        <option value="Crop land">Crop land</option>
                                        {/* Additional options as needed */}
                                        <option value="Forest Land">Forest Land</option>
                                        <option value="Non Agriculture">Non-Agriculture</option>
                                        <option value="Other Agricultural Land">Other Agricultural Land</option>
                                        <option value="Pasture">Pasture</option>
                                        <option value="Range">Range</option>

                                    </select>
                                </td>
                                <td>
                                    <select 
                                        value={tract.irrigationHistory || ''}
                                        onChange={(e) => handleChange(e, farmIndex, tractIndex, 'irrigationHistory')}>
                                        <option value=""></option>
                                        {/* Additional options as needed */}
                                    </select>
                                </td>
                                <td>
                                    <select 
                                        value={tract.tillageHistory || 'Conventional'}
                                        onChange={(e) => handleChange(e, farmIndex, tractIndex, 'tillageHistory')}>
                                        <option value="Conventional, Inversion">Conventional, Inversion</option>
                                        <option value="Conventional, vertical">Inversion, vertical</option>
                                        <option value="No-till, direct seed">No-till, direct seed</option>
                                        <option value="Reduced till, inversion">Reduced till, inversion</option>
                                        <option value="Reduced till, vertical">Reduced till, vertical</option>
                                        <option value="Strip till">Strip till</option>
                                        <option value="Other">Other</option>

                                    </select>
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
            <button onClick={onPrevious}>Previous</button>
            <button onClick={onNext}>Next</button>
        </div>
    );
}

export default ScreenTwo;
