import React from 'react';

function FirstScreen({ farms, setFarms, onNext }) {
    const addFarm = () => {
        setFarms([...farms, { farmNumber: '', tracts: [{ tractNumber: '', clus: [''] }] }]);
    };

    const removeFarm = (farmIndex) => {
        const newFarms = farms.filter((_, index) => index !== farmIndex);
        setFarms(newFarms);
    };

    const addTract = (farmIndex) => {
        const newFarms = [...farms];
        newFarms[farmIndex].tracts.push({ tractNumber: '', clus: [''] });
        setFarms(newFarms);
    };

    const removeTract = (farmIndex, tractIndex) => {
        const newFarms = farms.map((farm, index) => {
            if (index === farmIndex) {
                const newTracts = farm.tracts.filter((_, tIndex) => tIndex !== tractIndex);
                return { ...farm, tracts: newTracts };
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

    const handleChange = (e, farmIndex, tractIndex, cluIndex) => {
        const newFarms = [...farms];
        if (tractIndex === undefined) {
            newFarms[farmIndex].farmNumber = e.target.value;
        } else if (cluIndex === undefined) {
            newFarms[farmIndex].tracts[tractIndex].tractNumber = e.target.value;
        } else {
            newFarms[farmIndex].tracts[tractIndex].clus[cluIndex] = e.target.value;
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
                        <th>CLU ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {farms.map((farm, farmIndex) => (
                        <React.Fragment key={farmIndex}>
                            {farm.tracts.length === 0 ? (
                                <tr>
                                    <td>
                                        <input 
                                            type="text"
                                            value={farm.farmNumber}
                                            onChange={(e) => handleChange(e, farmIndex)}
                                        />
                                        <button onClick={() => removeFarm(farmIndex)}>Remove Farm</button>
                                    </td>
                                </tr>
                            ) : (
                                farm.tracts.map((tract, tractIndex) => (
                                    <tr key={`${farmIndex}-${tractIndex}`}>
                                        {tractIndex === 0 && (
                                            <td rowSpan={farm.tracts.length}>
                                                <input 
                                                    type="text"
                                                    value={farm.farmNumber}
                                                    onChange={(e) => handleChange(e, farmIndex)}
                                                />
                                                <button onClick={() => removeFarm(farmIndex)}>Remove Farm</button>
                                            </td>
                                        )}
                                        <td>
                                            <input 
                                                type="text" 
                                                value={tract.tractNumber}
                                                onChange={(e) => handleChange(e, farmIndex, tractIndex)}
                                            />
                                        </td>
                                        <td>
                                            {tract.clus.map((clu, cluIndex) => (
                                                <input 
                                                    key={cluIndex}
                                                    type="text" 
                                                    value={clu}
                                                    onChange={(e) => handleChange(e, farmIndex, tractIndex, cluIndex)}
                                                />
                                            ))}
                                            <button onClick={() => addClu(farmIndex, tractIndex)}>Add CLU</button>
                                            {tract.clus.length > 0 && <button onClick={() => removeClu(farmIndex, tractIndex, tract.clus.length - 1)}>Remove Last CLU</button>}
                                        </td>
                                        <td>
                                            <button onClick={() => removeTract(farmIndex, tractIndex)}>Remove Tract</button>
                                        </td>
                                    </tr>
                                    
                                ))
                            )}
                            <tr>
                                <td colSpan="4">
                                    <button onClick={() => addTract(farmIndex)}>Add Tract to Farm {farmIndex + 1}</button>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                    <tr>
                        <td colSpan="4">
                            <button onClick={addFarm}>Add New Farm</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={onNext}>Next</button>
        </div>
    );
}

export default FirstScreen;
