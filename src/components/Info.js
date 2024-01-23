import React, { useState } from 'react';
import '../styles/info.css';

function Info({ label, infoText }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="info-container">
      <label className="info-label">{label}</label>
      <svg
        className="info-icon"
        width="14"
        height="14"
        viewBox="0 0 30 30"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <path
          fillRule="evenodd"
          d="M8 1a7 7 0 11-.001 14.001A7 7 0 018 1zm0 2a1 1 0 100 2 1 1 0 000-2zm0 8.5a.5.5 0 01-.5-.5V6a.5.5 0 111 0v5a.5.5 0 01-.5.5z"
        />
      </svg>
      {isHovered && (
        <div className="info-tooltip">
          {infoText.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Info;
