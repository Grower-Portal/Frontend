import React, { useState } from 'react';
// import '../../styles/Questioneer.css';

const GrowerSurvey = ({formData, setFormData, onPrevious, onNext }) => {


    
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  

  // Handle Previous button click
  const handlePrevious = () => {
    onPrevious(); // Go back to the previous screen
  };

  return (
    <div className="form-screen">
      <div className="form-group">
        <label>How many controlling members, including spouses of controlling members that materially participate, comprise your farming entity?  Please note that this number DOES NOT include the number of employees and/or farm labor within your farming entity.<br/><br/> <span>NOTE: “Controlling Member” is defined as any member listed in the Articles of Organization for an entity, or any member of a partnership if not a single owner/operator. This excludes hired labor.</span> </label>
        <input type="number" name="controllingMembersCount" value={formData.controllingMembersCount} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label> I certify that my entity, and/or a controlling member, has a current CCC-860 certification.</label>
        <label><input type="radio" name="hasCCC860Certification" value="yes" checked={formData.hasCCC860Certification === 'yes'} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="hasCCC860Certification" value="no" checked={formData.hasCCC860Certification === 'no'} onChange={handleChange} /> No</label>
      </div>

      {formData.hasCCC860Certification === 'yes' && (
        <div className="form-group">
          <label>How many members of this entity contribute to this certification? </label>
          <input type="number" name="membersContributingToCCC860" value={formData.membersContributingToCCC860} onChange={handleChange} />
        </div>
      )}

      <div className="form-group">
        <label>Have any of the controlling members of your entity participated in the Louisiana State University (LSU) Master Farmer Program? </label>
        <label><input type="radio" name="hasParticipatedInLSUMasterFarmerProgram" value="yes" checked={formData.hasParticipatedInLSUMasterFarmerProgram === 'yes'} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="hasParticipatedInLSUMasterFarmerProgram" value="no" checked={formData.hasParticipatedInLSUMasterFarmerProgram === 'no'} onChange={handleChange} /> No</label>
      </div>

      {formData.hasParticipatedInLSUMasterFarmerProgram === 'yes' && (
        <div className="form-group">
          <label> How many members participated in the LSA Master Farmer Program? </label>
          <input type="number" name="membersParticipatedInLSUMasterFarmerProgram" value={formData.membersParticipatedInLSUMasterFarmerProgram} onChange={handleChange} />

          <label> What is the highest degree of participation by members in your entity in the Master Farmer Program? </label>
          <select name="highestDegreeOfParticipationInMasterFarmerProgram" value={formData.highestDegreeOfParticipationInMasterFarmerProgram} onChange={handleChange}>
            <option value="Phase 1">Phase 1</option>
            <option value="Phase 2">Phase 2</option>
            <option value="Phase 3">Phase 3</option>
            <option value="Master Farmer">Master Farmer</option>
          </select>
        </div>
      )}

      <div className="form-group">
        <label>How many years has the most experienced member of your entity farmed? <br/><br/> <span>NOTE: If entity has multiple members, how many years has the most experienced member been farming?</span>  </label>
        <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Did your entity farm rice in 2023?</label>
        <label><input type="radio" name="farmedRiceIn2023" value="yes" checked={formData.farmedRiceIn2023 === 'yes'} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="farmedRiceIn2023" value="no" checked={formData.farmedRiceIn2023 === 'no'} onChange={handleChange} /> No</label>
      </div>

      {formData.farmedRiceIn2023 === 'yes' && (
        <div className="form-group">
          <label>How many rice acres did your entity farm in 2023?</label>
          <input type="number" name="riceAcresFarmedIn2023" value={formData.riceAcresFarmedIn2023} onChange={handleChange} required />
        </div>
      )}

      {formData.farmedRiceIn2023 === 'no' && ( 
      <div className="form-group">
        <label>Is this your entity’s first year farming rice?</label>
        <label><input type="radio" name="isFirstYearFarmingRice" value="yes" checked={formData.isFirstYearFarmingRice === 'yes'} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="isFirstYearFarmingRice" value="no" checked={formData.isFirstYearFarmingRice === 'no'} onChange={handleChange} /> No</label>
      </div> )}

      {formData.isFirstYearFarmingRice === 'no' && ( 
      <div className="form-group">
        <label>When was your entity’s most recent year farming rice? </label>
        <input type="number" name="mostRecentYearFarmingRice" value={formData.mostRecentYearFarmingRice} onChange={handleChange} required />
      </div> )}

      {formData.isFirstYearFarmingRice === 'no' && ( 
      <div className="form-group">
        <label>how many rice acres did your entity farm in the crop year specified? </label>
        <input type="number" name="riceAcresFarmedInMostRecentYear" value={formData.riceAcresFarmedInMostRecentYear} onChange={handleChange} required />
      </div> )}

      <div className="form-group">
        <label>What percentage of your entity’s annual adjusted gross income (excluding your spouse’s W2 annual income, if any) is derived from on-farm activities? </label>
        <input type="number" name="percentageOfIncomeFromOnFarmActivities" value={formData.percentageOfIncomeFromOnFarmActivities} onChange={handleChange} placeholder='%' required />
      </div>

      <div className="form-group">
        <label>Does your entity volunteer to participate in the economic analysis of implementing a single dry-down (SDD) event in paddy rice production? This would involve providing on-farm management data to LSAU AgCenter’s Dr. Michael Deliberto’s team. </label>
        <label><input type="radio" name="volunteersForEconomicAnalysis" value="yes" checked={formData.volunteersForEconomicAnalysis === 'yes'} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="volunteersForEconomicAnalysis" value="no" checked={formData.volunteersForEconomicAnalysis === 'no'} onChange={handleChange} /> No</label>
      </div>

      <div className="form-group">
        <label>I, and all controlling members of this entity, understand that rice harvested from all acres enrolled in this Initiative, will be contracted with Supreme Rice, LLC as a requirement of participation. </label>
        <label><input type="radio" name="understandsContractWithSupremeRice" value="yes" checked={formData.understandsContractWithSupremeRice === 'yes'} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="understandsContractWithSupremeRice" value="no" checked={formData.understandsContractWithSupremeRice === 'no'} onChange={handleChange} /> No</label>
      </div>

      <div className="form-group">
        <label>I, and all controlling members of this entity, understand that receiving payment from various Partnerships for Climate-Smart Commodities, or Federal funding sources, for the implementation of alternate wetting and drying (AWD), or a single dry-down (SDD), on the same acres of land, in the same crop year, is prohibited?  </label>
        <label><input type="radio" name="understandsProhibitionOfDoubleFunding" value="yes" checked={formData.understandsProhibitionOfDoubleFunding === 'yes'} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="understandsProhibitionOfDoubleFunding" value="no" checked={formData.understandsProhibitionOfDoubleFunding === 'no'} onChange={handleChange} /> No</label>
      </div>

      <div className="form-group">
        <label>I, and all controlling members of this entity, understand that once I enter into an agreement with Supreme Rice, LLC (Supreme) to enroll in this AWD or SDD initiative, this entity will only receive payment from Supreme for implementing AWD or SDD on the specific acres enrolled in this individual program. </label>
        <label><input type="radio" name="understandsPaymentFromSupreme" value="yes" checked={formData.understandsPaymentFromSupreme === 'yes'} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="understandsPaymentFromSupreme" value="no" checked={formData.understandsPaymentFromSupreme === 'no'} onChange={handleChange} /> No</label>
      </div>

      <div className="form-group">
        <label>I certify that I have the authority to complete this application on behalf of the entity represented herein.</label>
        <label><input type="radio" name="hasAuthorityToCompleteApplication" value="yes" checked={formData.hasAuthorityToCompleteApplication ==='yes'} onChange={handleChange} /> Agree</label>
      </div>

      <div className="form-group">
        <label>Upload CCC-860 Certification</label>
        <input type="file" name="ccc860Attachment" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Upload Master Farmer Program Certification</label>
        <input type="file" name="masterFarmerParticipationAttachment" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Upload Supreme Rice NDA</label>
        <input type="file" name="srNDAAttachment" onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Upload Supreme Rice Agreement</label>
        <input type="file" name="srAgreementAttachment" onChange={handleChange} />
      </div>
    
    <button onClick={handlePrevious}>Previous</button>
    
    <button className="button" onClick={onNext}>Next</button>
    </div>
  );
};

export default GrowerSurvey;
