import React, { useState } from 'react';

const GrowerSurvey = ({FarmDetailsData, farmDetailsForm, setFarmDetailsForm, formData, setFormData, onPrevious, onNext }) => {


    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState("");
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process and send formData to the server or handle accordingly
    console.log(formData);
    // Handle Submit button click
    const confirmMessage =
      "Submit Application means you have checked every detail you have entered in the application, and you are confirming the details are true in nature. Do you want to submit the application?";
    const isConfirmed = window.confirm(confirmMessage);
    if (isConfirmed) {
      onSubmit(); // You can pass the forestInfo data to this function if needed
    }
  };

  // Handle actual submission
  const onSubmit = () => {
    // Logic to handle the actual submission, e.g., sending data to a server
    // You can also handle the uploaded document here

    // After successful submission:
    setSubmissionMessage("Application Submitted for Verification and Approval");
    setIsSubmitted(true); // Update the submission state
  };

  // Handle Previous button click
  const handlePrevious = () => {
    onPrevious(); // Go back to the previous screen
  };

  return (
    <div className="form-screen">
      <div className="form-group">
        <label>How many controlling members, including spouses, comprise your farming entity?</label>
        <input type="number" name="controllingMembers" value={formData.controllingMembers} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>I certify that my entity, and/or a controlling member, has a current CCC-860 certification.</label>
        <label><input type="radio" name="ccc860Certification" value="yes" checked={formData.ccc860Certification === 'yes'} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="ccc860Certification" value="no" checked={formData.ccc860Certification === 'no'} onChange={handleChange} /> No</label>
      </div>

      {formData.ccc860Certification === 'yes' && (
        <div className="form-group">
          <label>How many members of this entity contribute to this certification?</label>
          <input type="number" name="ccc860Members" value={formData.ccc860Members} onChange={handleChange} />
        </div>
      )}

      <div className="form-group">
        <label>Have any of the controlling members of your entity participated in the LSU Master Farmer Program?</label>
        <label><input type="radio" name="participatedInLSUMasterFarmer" value="yes" checked={formData.participatedInLSUMasterFarmer === 'yes'} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="participatedInLSUMasterFarmer" value="no" checked={formData.participatedInLSUMasterFarmer === 'no'} onChange={handleChange} /> No</label>
      </div>

      {formData.participatedInLSUMasterFarmer === 'yes' && (
        <div className="form-group">
          <label>How many members participated in the LSU Master Farmer Program?</label>
          <input type="number" name="lSUMasterFarmerParticipants" value={formData.lSUMasterFarmerParticipants} onChange={handleChange} />

          <label>What is the highest degree of participation by members in your entity in the Master Farmer Program?</label>
          <select name="highestDegreeOfParticipation" value={formData.highestDegreeOfParticipation} onChange={handleChange}>
            <option value="Phase 1">Phase 1</option>
            <option value="Phase 2">Phase 2</option>
            <option value="Phase 3">Phase 3</option>
            <option value="Master Farmer">Master Farmer</option>
          </select>
        </div>
      )}

      <div className="form-group">
        <label>How many years has the most experienced member of your entity farmed?</label>
        <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Did your entity farm rice in 2023?</label>
        <label><input type="radio" name="farmedRiceIn2023" value="yes" checked={formData.farmedRiceIn2023 === 'yes'} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="farmedRiceIn2023" value="no" checked={formData.farmedRiceIn2023 === 'no'} onChange={handleChange} /> No</label>
      </div>

      {formData.farmedRiceIn2023 === 'yes' && (
        <div className="form-group">
          <label>How many acres of rice did your entity farm in 2023?</label>
          <input type="number" name="riceAcres2023" value={formData.riceAcres2023} onChange={handleChange} required />
        </div>
      )}

      <div className="form-group">
        <label>What is the first year that your entity farmed rice?</label>
        <input type="number" name="firstYearFarmingRice" value={formData.firstYearFarmingRice} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>What is the last year that your entity farmed rice?</label>
        <input type="number" name="lastYearFarmedRice" value={formData.lastYearFarmedRice} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>How many acres of rice did your entity farm last year?</label>
        <input type="number" name="riceAcresLastYear" value={formData.riceAcresLastYear} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>What percentage of your entity's gross income is derived from farming?</label>
        <input type="number" name="incomePercentage" value={formData.incomePercentage} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Do you wish to participate in the Soil and Water Conservation District (SWCD) Study?</label>
        <label><input type="radio" name="participateInSDDStudy" value="yes" checked={formData.participateInSDDStudy === 'yes'} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="participateInSDDStudy" value="no" checked={formData.participateInSDDStudy === 'no'} onChange={handleChange} /> No</label>
      </div>

      <div className="form-group">
        <label>Do you understand and agree to the prohibition of double funding for AWD or SDD?</label>
        <label><input type="radio" name="understandingOfFundingProhibition" value="yes" checked={formData.understandingOfFundingProhibition === 'yes'} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="understandingOfFundingProhibition" value="no" checked={formData.understandingOfFundingProhibition === 'no'} onChange={handleChange} /> No</label>
      </div>

      <div className="form-group">
        <label>Do you agree to only receive payment from either Supreme Rice or NRCS for AWD or SDD?</label>
        <label><input type="radio" name="agreementOnAWDorSDDPayment" value="yes" checked={formData.agreementOnAWDorSDDPayment === 'yes'} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="agreementOnAWDorSDDPayment" value="no" checked={formData.agreementOnAWDorSDDPayment === 'no'} onChange={handleChange} /> No</label>
      </div>

      <div className="form-group">
        <label>I certify that I have the authority to complete this application on behalf of the entity listed.</label>
        <label><input type="checkbox" name="authorityToCompleteApplication" checked={formData.authorityToCompleteApplication} onChange={handleChange} /> Agree</label>
      </div>

      <div className="form-group">
        <label>Upload CCC-860 Certification</label>
        <input type="file" name="ccc860File" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Upload Master Farmer Program Certification</label>
        <input type="file" name="masterFarmerFile" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Upload Supreme Rice NDA</label>
        <input type="file" name="srNDAFile" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Upload Supreme Rice Agreement</label>
        <input type="file" name="srAgreementFile" onChange={handleChange} />
      </div>

        <div className="submission-message">{submissionMessage}</div>
    
    {!isSubmitted && <button onClick={handlePrevious}>Previous</button>}
    {!isSubmitted && <button onClick={handleSubmit}>Submit Application</button>}
    </div>
  );
};

export default GrowerSurvey;
