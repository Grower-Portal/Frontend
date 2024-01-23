import React, {useState} from 'react';
import Info from '../../components/Info';
import '../../styles/CommodityInformation.css';


function CommodityInformation({CommodityData, commodityForm, setCommodityForm, onPrevious, onNext }) {

    const [commodityRows, setCommodityRows] = useState( commodityForm.length > 0 ? commodityForm : CommodityData ); // State to store the farm details rows

    console.log("commodityRows", commodityRows);
    

    console.log("log for", commodityRows);
    
    const handleChange = (e, index) => {
        console.log('handleChange called'); // Debugging
        const updatedCommodityRows = [...commodityRows];
        updatedCommodityRows[index] = {
            ...updatedCommodityRows[index],
            [e.target.name]: e.target.value,
        };
        console.log(updatedCommodityRows); // Debugging
        setCommodityRows(updatedCommodityRows);
        setCommodityForm(updatedCommodityRows);
    };


    return (
        <div className="Commodity-Information">
            <h1>Commodity Information</h1>
            <table>
                <thead>
                    <tr>
                        <th>Farm ID</th>
                        <th>
                            <Info
                            label={`Field Name`}
                            infoText={`What is the "common field name"\n
                            assigned to this land unit by the grower?\n
                            This will be used to group Field IDs\n
                            according to grower's nomenclature`}  
                        />
                        </th>
                        <th>Report Qty (Acres)</th>
                        <th>
                            <Info
                                label={`Commodity Category`}
                                infoText={`What is the intended commodity category\n
                                to produce on this field for the\n
                                upcoming crop year? (If rice, then crops)`}
                            />
                        </th>
                        <th>
                            <Info
                                label={`Commodity Type`}
                                infoText={`What is the intended commodity type\n
                                to produce on this field for the upcoming crop year?`}
                            />
                        </th>
                        <th>Field Land Use History</th>
                        <th>Field Irrigation History</th>
                        <th>Field Tillage History</th>
                        <th>Field CSAF Practice History</th>
                        <th>Past CSAF Practice History</th>
                    </tr>
                </thead>
                <tbody>
                    {commodityRows.map((row, index) => (
                        <tr key={index}>
                            <td>{commodityRows[index]?.farmNumber}</td>
                            <td>{commodityRows[index]?.fieldName}</td>
                            <td>
                                <input
                                    type="text"
                                    name='reportQtyAcres'
                                    value={row.reportQtyAcres}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </td>
                            <td>
                                <select
                                    name='commodityCategory'
                                    value={row.commodityCategory}
                                    onChange={(e) => handleChange(e, index)}>
                                    <option value="Crops">Crops</option>
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
                                    name='commodityType'
                                    value={row.commodityType}
                                    onChange={(e) => handleChange(e, index)}>
                                    <option value="Rice">Rice</option>
                                    {/* Additional options for Commodity Type */}
                                </select>
                            </td>
                            <td>
                                <select 
                                    name='fieldLandUseHistory'
                                    value={row.fieldLandUseHistory}
                                    onChange={(e) => handleChange(e, index)}>
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
                                    name='fieldIrrigationHistory'
                                    value={row.fieldIrrigationHistory}
                                    onChange={(e) => handleChange(e, index)}>
                                    {/* Additional options as needed */}
                                    <option value="No Irrigation">No Irrigation</option>
                                    <option value="Flood/border">Flood/border</option>
                                    <option value="Furrow/ditch">Furrow/ditch</option>
                                    <option value="Surface">Surface</option>
                                    <option value="Wheel Line">Wheel Line</option>
                                    <option value="Other">Other</option>
                                </select>
                            </td>
                            <td>
                                <select 
                                    name='fieldTillageHistory'
                                    value={row.fieldTillageHistory}
                                    onChange={(e) => handleChange(e, index)}>
                                    <option value="Conventional, Inversion">Conventional, Inversion</option>
                                    <option value="Conventional, vertical">Inversion, vertical</option>
                                    <option value="No-till, direct seed">No-till, direct seed</option>
                                    <option value="Reduced till, inversion">Reduced till, inversion</option>
                                    <option value="Reduced till, vertical">Reduced till, vertical</option>
                                    <option value="Strip till">Strip till</option>
                                    <option value="Other">Other</option>
                                </select>
                            </td>
                            <td>
                                <select 
                                    name='fieldCsafPracticeHistory'
                                    value={row.fieldCsafPracticeHistory}
                                    onChange={(e) => handleChange(e, index)}>
                                    <option value="yes">yes</option>
                                    <option value="no">no</option>
                                    <option value="I don't know">I don't know</option>
                                    {/* Additional options as needed */}
                                </select>
                            </td>
                            <td>
                                <select 
                                    name='pastCsafPracticeHistory'
                                    value={row.pastCsafPracticeHistory}
                                    onChange={(e) => handleChange(e, index)}>
                                    <option value="I don't know">I don't know</option>
                                    <option value="Yes">Yes</option>
                                    <option value="Some">Some</option>
                                    <option value="No">No</option>

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

export default CommodityInformation;
