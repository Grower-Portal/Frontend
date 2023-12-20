import React, { useState } from 'react';
import '../styles/AddApplication.css';
import Layout from '../components/Layout';


function AddApplication() {
    const [farmNumber, setFarmNumber] = useState('');
    const [tractNumber, setTractNumber] = useState('');
    const [CLU, setCLU] = useState('');
    const [RptQty, setRptQty] = useState('');
    const [fsaPhysicalLocation, setFsaPhysicalLocation] = useState('');
    const [commodityCategory, setCommodityCategory] = useState('');
    const [commodityType, setCommodityType] = useState('');
    const [growerFieldName, setGrowerFieldName] = useState('');
    const [fieldLandUseHistory, setFieldLandUseHistory] = useState('');
    const [fieldIrrigationHistory, setFieldIrrigationHistory] = useState('');
    const [livestockTypes, setLivestockTypes] = useState('');
    const [totalForestArea, setTotalForestArea] = useState('');
    const [pastCSAFPraactices, setPastCSAFPraactices] = useState('');
    const [isUSDAOrganic, setIsUSDAOrganic] = useState('');
    const [documentUpload, setDocumentUpload] = useState(null);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        setSubmissionMessage('Application submitted.');
    };

    return (
        <Layout>
        <div className="form-container">
        <h1 className="form-title">Add Application</h1>
        <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="farm-number">Farm Number:</label>
            <input className="form-input" type="text" id="farm-number" value={farmNumber} onChange={(e) => setFarmNumber(e.target.value)} required />

            <label className="form-label" htmlFor="tract-number">Tract Number:</label>
            <input className="form-input" type="text" id="tract-number" value={tractNumber} onChange={(e) => setTractNumber(e.target.value)} required />

            <label className="form-label" htmlFor="CLU">CLU:</label>
            <input className="form-input" type="text" id="CLU" value={CLU} onChange={(e) => setCLU(e.target.value)} required />

            <label className="form-label" htmlFor="RptQty">Report Quantity:</label>
            <input className="form-input" type="text" id="RptQty" value={RptQty} onChange={(e) => setRptQty(e.target.value)} required />

            <label className="form-label" htmlFor="fsa-location">FSA Physical Location:</label>
            <input className="form-input" type="text" id="fsa-location" value={fsaPhysicalLocation} onChange={(e) => setFsaPhysicalLocation(e.target.value)} required />

            <label className="form-label" htmlFor="commodity-category">Commodity Category:</label>
            <select className="form-input" id="commodity-category" value={commodityCategory} onChange={(e) => setCommodityCategory(e.target.value)} required>
                {/* Add specific options here */}
                <option value="">Select an option</option>
                <option value="yes">Rice</option>
            </select>

            <label className="form-label" htmlFor="commodity-type">Commodity Type:</label>
            <input className="form-input" type="text" id="commodity-type" value={commodityType} onChange={(e) => setCommodityType(e.target.value)} required />

            <label className="form-label" htmlFor="grower-field-name">Grower Field Name:</label>
            <input className="form-input" type="text" id="grower-field-name" value={growerFieldName} onChange={(e) => setGrowerFieldName(e.target.value)} required />

            <label className="form-label" htmlFor="field-land-use-history">Field Land Use History:</label>
            <textarea className="form-input" id="field-land-use-history" value={fieldLandUseHistory} onChange={(e) => setFieldLandUseHistory(e.target.value)} required></textarea>

            <label className="form-label" htmlFor="field-irrigation-history">Field Irrigation History:</label>
            <textarea className="form-input" id="field-irrigation-history" value={fieldIrrigationHistory} onChange={(e) => setFieldIrrigationHistory(e.target.value)} required></textarea>

            <label className="form-label" htmlFor="livestock-types">Livestock Types:</label>
            <input className="form-input" type="text" id="livestock-types" value={livestockTypes} onChange={(e) => setLivestockTypes(e.target.value)} required />

            <label className="form-label" htmlFor="total-forest-area">Total Forest Area:</label>
            <input className="form-input" type="text" id="total-forest-area" value={totalForestArea} onChange={(e) => setTotalForestArea(e.target.value)} required />

            <label className="form-label" htmlFor="past-csaf-practices">Past Climate Smart Agriculture and Forestry Practices:</label>
            <textarea className="form-input" id="past-csaf-practices" value={pastCSAFPraactices} onChange={(e) => setPastCSAFPraactices(e.target.value)} required></textarea>

            <label className="form-label" htmlFor="usda-organic">Is Any Portion of the Farm Currently or Transitioning to USDA-Certified Organic?</label>
            <select className="form-input" id="usda-organic" value={isUSDAOrganic} onChange={(e) => setIsUSDAOrganic(e.target.value)} required>
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="transitioning">Transitioning</option>
            </select>

            <label className="form-label" htmlFor="document-upload">Document Upload (PI):</label>
                <input 
                    className="form-input" 
                    type="file" 
                    id="document-upload" 
                    onChange={(e) => setDocumentUpload(e.target.files[0])} 
                    required 
                />

                <button className="form-button" type="submit">Submit Application</button>
            </form>

            {submissionMessage && <p className="submission-message">{submissionMessage}</p>}
    </div>
    </Layout>
    );
}

export default AddApplication;
