import React, { useState } from 'react';

const Help = ({ helpText }) => {
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  const toggleHelp = () => {
    setIsHelpVisible(!isHelpVisible);
  };

  return (
    <div className="help-container">
      <span className="help-icon" onClick={toggleHelp}>
        Help
      </span>
      {isHelpVisible && (
        <div className="help-popover">
          <p>{helpText}</p>
        </div>
      )}
    </div>
  );
};

export default Help;
