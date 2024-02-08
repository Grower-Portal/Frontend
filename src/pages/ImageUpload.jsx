import React, { useState } from 'react';
import '../styles/ImageUpload.css';
import Layout from '../components/Layout';

function ImageUpload() {
  const [uploadVisible, setUploadVisible] = useState(false);

  const handleFileChange = (e) => {
    setUploadVisible(!!e.target.files.length); // Set uploadVisible true if files are selected
  };

  const uploadFile = () => {
    alert('File uploaded successfully!');
  };

  return (
    <Layout>
      {/* Content of AnyPage goes here */}
      <h1>Welcome to Grower Portal!</h1>

      <div id="upload-container">
        <input type="file" id="file-input" onChange={handleFileChange} />
        <button 
          id="upload-button" 
          onClick={uploadFile}
          className={uploadVisible ? 'visible' : ''}  // Apply the 'visible' class based on uploadVisible state
        >
          Upload
        </button>
      </div>
    </Layout>
  );
}

export default ImageUpload;
