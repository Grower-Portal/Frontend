import React from 'react';

function ScreenZero({ producerInfo, setProducerInfo, onNext }) {
    const handleChange = (e, fieldName) => {
        setProducerInfo({ ...producerInfo, [fieldName]: e.target.value });
    };

    return (
        <div className="form-screen">
            <h1>Producer Information</h1>
            <div className="form-group">
                <label>Producer Name (Authorized Signatory Official):</label>
                <input 
                    type="text"
                    value={producerInfo.producerName || ''}
                    onChange={(e) => handleChange(e, 'producerName')}
                />
            </div>
            <div className="form-group">
                <label>Producer Entity Name (Per 578 Producer Print):</label>
                <input 
                    type="text"
                    value={producerInfo.entityName || ''}
                    onChange={(e) => handleChange(e, 'entityName')}
                />
            </div>
            <div className="form-group">
                <label>County of Residence (Must match FSA 578 Producer Print):</label>
                <input 
                    type="text"
                    value={producerInfo.countyOfResidence || ''}
                    onChange={(e) => handleChange(e, 'countyOfResidence')}
                />
            </div>
            <div className="form-group">
                <label>Producer Address (Mailing Address):</label>
                <input 
                    type="text"
                    value={producerInfo.producerAddress || ''}
                    onChange={(e) => handleChange(e, 'producerAddress')}
                />
            </div>
            <div className="form-group">
                <label>Underserved Status:</label>
                <select 
                    value={producerInfo.underservedStatus || ''}
                    onChange={(e) => handleChange(e, 'underservedStatus')}>
                    {/* Dropdown options */}
                    <option value="?">?undefined</option>
                </select>
            </div>
            <div className="form-group">
                <label>Baseline Yield of Entire Operation (BBLs/Acre):</label>
                <input 
                    type="number"
                    value={producerInfo.baselineYield || ''}
                    onChange={(e) => handleChange(e, 'baselineYield')}
                />
            </div>
            <div className="form-group">
                <label>Primary Reason for Applying:</label>
                <select 
                    value={producerInfo.primaryReason || ''}
                    onChange={(e) => handleChange(e, 'primaryReason')}>
                    {/* Dropdown options */}
                    <option value="Financial Benefit">Financial Benefit</option>
                    <option value="Environmental Benefit">Environmental Benefit</option>
                    <option value="New Market Opportunity">New Market Opportunity</option>
                    <option value="Partnerships or networks">Partnerships or networks</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label>Has the Primary Operator Implemented CSAF Practices in the Last 10 Years Anywhere On-Farm?:</label>
                <select 
                    value={producerInfo.csafPractices || ''}
                    onChange={(e) => handleChange(e, 'csafPractices')}>
                    {/* Dropdown options */}
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="I don't know">I don't know</option>
                </select>
            </div>
            <button onClick={onNext}>Next</button>
        </div>
    );
}

export default ScreenZero;
