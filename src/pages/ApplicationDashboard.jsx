import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function ApplicationDashboard() {
  const navigate = useNavigate();
  const farmerId = localStorage.getItem('farmerId');
  const [applicationID, setApplicationID] = useState(0);
  const [applications, setApplications] = useState([]);

  const addApplication = () => {
    const newApplication = {
      id: uuidv4(),
      timestamp: new Date().toISOString().slice(0, 10),
      status: 'Start Application',
    };
    setApplications([...applications, newApplication]);
    setApplicationID(applicationID + 1);
  };

  const savedProgress = JSON.parse(localStorage.getItem('applicationProgress'));
  console.log("Saved Progress", savedProgress);
  const status = savedProgress ? "In Progress" : 'Start Application';

  const handleStartApplication = () => {
    const newApplication = {
      farmerId: parseInt(farmerId),
      applicationDate: new Date().toISOString().slice(0, 10),
      status: 'In Progress',
      applicationID: applicationID,
    };

    navigate(`/AddApplication?farmerId=${newApplication.farmerId}&applicationDate=${newApplication.applicationDate}&status=${newApplication.status}&applicationID=${newApplication.applicationID}`);
  };

  const handleEdit = (id) => {
    // Here, you can implement the logic to handle editing an application based on its ID
    console.log(`Editing application with ID: ${id}`);
  };

  return (
    <Layout>
      <div className="container">
        <h2 style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>My Applications</h2>
        <button className="btn btn-add" onClick={addApplication}>
          + Add Application
        </button>
        {applications.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Timestamp</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="applicationList">
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.id}</td>
                  <td>{application.timestamp}</td>
                  <td>{application.status}</td>
                  <td>
                    {application.status === 'Start Application' && (
                      <button
                        className="btn btn-start-application"
                        onClick={handleStartApplication}
                      >
                        Start Application
                      </button>
                    )}
                    {application.status === 'In Progress' && (
                      <button className="btn btn-edit" onClick={() => handleEdit(application.id)}>
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

export default ApplicationDashboard;
