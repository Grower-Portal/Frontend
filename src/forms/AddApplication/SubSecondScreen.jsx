import React, { useState } from 'react';

function ScreenTwo({ farms, setFarms, onPrevious, onNext }) {
    const [showHelp, setShowHelp] = useState(false);

    const handleChange = (e, farmIndex, fieldName) => {
        const updatedFarms = [...farms];
        updatedFarms[farmIndex][fieldName] = e.target.value;
        setFarms(updatedFarms);
    };

    const toggleHelpText = () => {
        setShowHelp(!showHelp);
    };

    return (
        <div className="form-screen">
            <h1>Commodity Information</h1>
            <table>
                <thead>
                    <tr>
                        <th>Farm ID</th>
                        <th>Field Name</th>
                        <th>Report Qty (Acres)</th>
                        <th>Commodity Category</th>
                        <th>Commodity Type</th>
                    </tr>
                </thead>
                <tbody>
                    {farms.map((farm, farmIndex) => (
                        <tr key={`${farmIndex}`}>
                            <td>{farm.farmNumber}</td>
                            <td>{farm.fieldName}</td>
                            <td>
                                <input
                                    type="text"
                                    value={farm.reportQtyAcres || ''}
                                    onChange={(e) => handleChange(e, farmIndex, 'reportQtyAcres')}
                                />
                            </td>
                            <td>
                                <select
                                    value={farm.commodityCategory || "Select Category"}
                                    onChange={(e) => handleChange(e, farmIndex, 'commodityCategory')}>
                                    <option value="Crops" selected>Crops</option>
                                    <option value="Livestock">Livestock</option>
                                    <option value="Trees">Trees</option>
                                    <option value="Crops and Livestock">Crops and Livestock</option>
                                    <option value="Crops and Trees">Crops and Trees</option>
                                    <option value="Livestock and Trees">Livestock and Trees</option>
                                    <option value="Crops, Livestock and Trees">Crops, Livestock and Trees</option>
                                    {/* Additional options for Commodity Category */}
                                </select>
                            </td>
                            <td>
                                <select
                                    value={farm.commodityType || "Select Type"}
                                    onChange={(e) => handleChange(e, farmIndex, 'commodityType')}>
                                    <option value="Rice" selected>Rice</option>
                                
                                    {/* Additional options for Commodity Type */}
                                </select>
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

export default ScreenTwo;
