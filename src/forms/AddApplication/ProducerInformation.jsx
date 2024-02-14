import React from 'react';
import Info from '../../components/Info';

// import { useLocation } from 'react-router-dom';

function ProducerInformation({ producerInfo,  setProducerInfo, onNext }) {

    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const farmerId = queryParams.get("farmer_id");
    // const { applicationDate, applicationStatus } = location.state;
    
    console.log(producerInfo);
  
    const handleSubmit = async () => {
        const countyOfResidence = producerInfo.countyOfResidence;
        const baselineYield = producerInfo.baselineYield;
        const primaryReasonForApplying = producerInfo.primaryReasonForApplying;
        const implementedCsafPractices = producerInfo.implementedCsafPractices;
        const isUnderservedSmallProducer = producerInfo.isUnderservedSmallProducer;
        const producerName = producerInfo.producerName;
        const producerAddress = producerInfo.producerAddress;
        const producerEntityName = producerInfo.producerEntityName;
        
      onNext();
    };

    return (
        <div className="form-screen">
      <h1>Producer Information</h1>
      <div className="form-group">
        <label>Producer Name (Authorized Signatory Official)</label>
        <input
          type="text"
          value={producerInfo.producerName}
          onChange={(e) => setProducerInfo({ ...producerInfo, producerName: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Producer Entity Name (Per 578 Producer Print)</label>
        <input
          type="text"
          value={producerInfo.producerEntityName}
          onChange={(e) => setProducerInfo({ ...producerInfo, producerEntityName: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>County of Residence</label>
        <input
          type="text"
          value={producerInfo.countyOfResidence}
          onChange={(e) => setProducerInfo({ ...producerInfo, countyOfResidence: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Producer Address (Mailing Address)</label>
        <input
          type="text"
          value={producerInfo.producerAddress}
          onChange={(e) => setProducerInfo({ ...producerInfo, producerAddress: e.target.value })}
        />
      </div>
            <div className="form-group">
            <Info
                label="Are you considered an undeserved and/or a small producer? This is voluntary."
                infoText={`This category is described as being one or more of the following:\n
                            - Socially disadvantaged farmer or rancher\n
                            - Limited resource farmer or rancher\n
                            - Beginning farmer or rancher\n
                            - Veteran farmer or rancher`}
            />
                <select 
                    value={producerInfo.isUnderservedSmallProducer}
                    onChange={(e) => setProducerInfo({ ...producerInfo, isUnderservedSmallProducer: e.target.value })}>
                    {/* Dropdown options */}
                    <option defaultValue=" ">Choose here</option>
                    <option defaultValue="Yes, underserved">Yes, underserved</option>
                    <option value="Yes, small producer">Yes, small producer</option>
                    <option value="Yes, underserved and small producer">Yes, underserved and small producer</option>
                    <option value="No">No</option>
                    <option value="I don't know">I don't know</option>

                </select>
            </div>
            <div className="form-group">
            <Info
                label="Baseline Yield  of Entire Operation (BBLs/Acre)"
                infoText={`What is a general estimate of your operation's\n
                average overall baseline yield in BBLs/acre?`}
            />
                <input 
                    type="number"
                    value={producerInfo.baselineYield}
                    onChange={(e) => setProducerInfo({ ...producerInfo, baselineYield: e.target.value })}
                />
            </div>
            <div className="form-group">
        <label>Primary Reason for Applying</label>
        <select
          value={producerInfo.primaryReasonForApplying}
          onChange={(e) => setProducerInfo({ ...producerInfo, primaryReasonForApplying: e.target.value })}
        >
          {/* Dropdown options */}
          <option defaultValue=" ">Choose here</option>
          <option value="Financial Benefit">Financial Benefit</option>
          <option value="Environmental Benefit">Environmental Benefit</option>
          <option value="New Market Opportunity">New Market Opportunity</option>
          <option value="Partnerships or networks">Partnerships or networks</option>
          <option value="Other">Other</option>
        </select>
      </div>
            <div className="form-group">
                <Info
                label="Has the Primary Operator Implemented CSAF Practices in the Last 10 Years Anywhere On-Farm?"
                infoText={`Has this farm implemented climate‐smart agriculture\n
                or forestry (CSAF) practices anywhere on the
                farm in the past 10 years or since the\n
                current primary operator took control\n
                (whichever time period is shorter)?`}
            />
                <select 
                    value={producerInfo.implementedCsafPractices}
                    onChange={(e) => setProducerInfo({ ...producerInfo, implementedCsafPractices: e.target.value })}>
                    {/* Dropdown options */}
                    <option defaultValue=" ">Choose here</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="I don't know">I don't know</option>
                </select>
            </div>
            <button onClick={handleSubmit}>Next</button>
        </div>
    );
}

export default ProducerInformation;
