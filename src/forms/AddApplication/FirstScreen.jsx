import React from 'react';

function FirstScreen({ farms, setFarms, onPrevious, onNext }) {
    const addFarm = () => {
        setFarms([...farms, { 
            farmNumber: '', 
            tracts: [{
                tractNumber: '', 
                clus: [''], 
                fieldName: '',
                rptQty: '', 
                fsaLocation: '',
                commodityCategory: 'Crops', 
                commodityType: 'Rice'
            }] 
        }]);
    };

    const removeFarm = (farmIndex) => {
        const newFarms = farms.filter((_, index) => index !== farmIndex);
        setFarms(newFarms);
    };

    const addTract = (farmIndex) => {
        const newFarms = [...farms];
        newFarms[farmIndex].tracts.push({ 
            tractNumber: '', 
            clus: [''], 
            fieldName: '',
            rptQty: '', 
            fsaLocation: '',
            commodityCategory: 'Crops', 
            commodityType: 'Rice'
        });
        setFarms(newFarms);
    };

    const removeTract = (farmIndex, tractIndex) => {
        const newFarms = farms.map((farm, index) => {
            if (index === farmIndex) {
                return {
                    ...farm,
                    tracts: farm.tracts.filter((_, tIndex) => tIndex !== tractIndex)
                };
            }
            return farm;
        });
        setFarms(newFarms);
    };

    const addClu = (farmIndex, tractIndex) => {
        const newFarms = [...farms];
        newFarms[farmIndex].tracts[tractIndex].clus.push('');
        setFarms(newFarms);
    };

    const removeClu = (farmIndex, tractIndex, cluIndex) => {
        const newFarms = [...farms];
        newFarms[farmIndex].tracts[tractIndex].clus.splice(cluIndex, 1);
        setFarms(newFarms);
    };

    const handleChange = (e, farmIndex, tractIndex, field) => {
        const newFarms = [...farms];
        if (field === 'farmNumber') {
            newFarms[farmIndex].farmNumber = e.target.value;
        } else if (field.includes('clu')) {
            const cluIndex = parseInt(field.split('_')[1]);
            newFarms[farmIndex].tracts[tractIndex].clus[cluIndex] = e.target.value;
        } else {
            newFarms[farmIndex].tracts[tractIndex][field] = e.target.value;
        }
        setFarms(newFarms);
    };

    return (
        <div className="form-screen">
            <h1>Farm Information</h1>
            <table>
                <thead>
                    <tr>
                        <th>Farm Number</th>
                        <th>Tract Number</th>
                        <th>Field</th>
                        <th>Field Name</th>
                        <th>RPT Qty (Acres)</th>
                        <th>FSA Physical Location</th>
                        <th>Commodity Category</th>
                        <th>Commodity Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {farms.map((farm, farmIndex) => (
                        <React.Fragment key={farmIndex}>
                            {farm.tracts.map((tract, tractIndex) => (
                                <tr key={`${farmIndex}-${tractIndex}`}>
                                    {tractIndex === 0 && (
                                        <td rowSpan={farm.tracts.length || 1}>
                                            <input 
                                                type="text"
                                                value={farm.farmNumber}
                                                onChange={(e) => handleChange(e, farmIndex, null, 'farmNumber')}
                                            />
                                            <button onClick={() => removeFarm(farmIndex)}>Remove Farm</button>
                                        </td>
                                    )}
                                    <td>
                                        <input 
                                            type="text" 
                                            value={tract.tractNumber}
                                            onChange={(e) => handleChange(e, farmIndex, tractIndex, 'tractNumber')}
                                        />
                                    </td>
                                    <td>
                                        {tract.clus.map((clu, cluIndex) => (
                                            <div key={cluIndex}>
                                                <input 
                                                    type="text" 
                                                    value={clu}
                                                    onChange={(e) => handleChange(e, farmIndex, tractIndex, `clu_${cluIndex}`)}
                                                />
                                                <button onClick={() => removeClu(farmIndex, tractIndex, cluIndex)}>Remove Field</button>
                                            </div>
                                        ))}
                                        <button onClick={() => addClu(farmIndex, tractIndex)}>Add Field</button>
                                    </td>
                                    <td>
                                        <input 
                                            type="text" 
                                            value={tract.fieldName}
                                            onChange={(e) => handleChange(e, farmIndex, tractIndex, 'fieldName')}
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            value={tract.rptQty}
                                            onChange={(e) => handleChange(e, farmIndex, tractIndex, 'rptQty')}
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="text" 
                                            value={tract.fsaLocation}
                                            onChange={(e) => handleChange(e, farmIndex, tractIndex, 'fsaLocation')}
                                        />
                                    </td>
                                    <td>
                                        <select 
                                            value={tract.commodityCategory}
                                            onChange={(e) => handleChange(e, farmIndex, tractIndex, 'commodityCategory')}>
                                            <option value="Crops">Crops</option>
                                            {/* Additional commodity category options */}
                                            <option value="livestock">Livestock</option>
                                            <option value="trees">Trees</option>
                                            <option value="crops-livestock">Crops and Livestock</option>
                                            <option value="crops-trees">Crops and Trees</option>
                                            <option value="livestock-trees">Livestock and Trees</option>
                                            <option value="crops-livestock-trees">Crops, Livestock and Trees</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select 
                                            value={tract.commodityType}
                                            onChange={(e) => handleChange(e, farmIndex, tractIndex, 'commodityType')}>
                                            <option value="Rice">Rice</option>
                                            <option value="Not rice; crop ineligible">Not rice; crop ineligible</option>
                                            {/* Additional commodity type options */}
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => removeTract(farmIndex, tractIndex)}>Remove Tract</button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="9">
                                    <button onClick={() => addTract(farmIndex)}>Add Tract to Farm {farmIndex + 1}</button>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                    <tr>
                        <td colSpan="9">
                            <button onClick={addFarm}>Add New Farm</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={onPrevious}>Previous</button>
            <button onClick={onNext}>Next</button>
        </div>
    );
}

export default FirstScreen;
