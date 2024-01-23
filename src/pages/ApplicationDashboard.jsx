import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import AddApplication from '../forms/AddApplication/AddApplication';


function ApplicationDashboard() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const farmerId = queryParams.get("farmer_id");

  // console.log(typeof(farmerId));

  const [applications, setApplications] = useState([
    {
      timestamp: new Date().toISOString(),
      status: 'Start Application',
    },
  ]);

  const addApplication = () => {
    setApplications([
      ...applications,
      { timestamp: new Date().toISOString(), status: 'Start Application' },
    ]);
  };

  const handleStatusChange = (index, event) => {
    const newApplications = [...applications];
    newApplications[index].status = event.target.value;
    setApplications(newApplications);
  };

  const handleStartApplication = () => {
    // Create a new application object
    const newApplication = {
      // farmerId: parseInt(farmerId), // Convert farmerId to an integer
      producerInfoId: 0,
      applicationDate: new Date().toISOString().slice(0, 10), // Format date as YYYY-MM-DD
      status: 'string', // You can set the default status as needed
    };

    console.log(newApplication);

    // Send a POST request to your API to create the new application
    

        navigate(`/AddApplication`);
  };

  return (
    <Layout>
      <div className="container">
        <h2>My Applications</h2>
        <button className="btn btn-add" onClick={addApplication}>
          + Add Application
        </button>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="applicationList">
        {applications.map((application, index) => (
          <tr key={index}>
            <td>{application.timestamp}</td>
            <td>
              <select
                value={application.status}
                onChange={(event) => handleStatusChange(index, event)}
              >
                <option value="Start Application">Start Application</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Approved">Approved</option>
              </select>
            </td>
            <td>
              {application.status === 'Start Application' && (
                <button
                  className="btn btn-start-application"
                  onClick={handleStartApplication}
                >
                  Start Application
                </button>
              )}
              {application.status !== 'Start Application' && (
                <>
                  <button className="btn btn-edit">Edit</button>
                  <button className="btn btn-resubmit">Resubmit</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</Layout>
);
}

export default ApplicationDashboard;