import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

function ApplicationDashboard() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([
    {
      name: '',
      status: 'willApply',
    },
  ]);

  const addApplication = () => {
    setApplications([...applications, { name: '', status: 'willApply' }]);
  };

  const handleNameChange = (index, event) => {
    const newApplications = [...applications];
    newApplications[index].name = event.target.value;
    setApplications(newApplications);
  };

  const handleStatusChange = (index, event) => {
    const newApplications = [...applications];
    newApplications[index].status = event.target.value;
    setApplications(newApplications);
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
              <th>Application Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="applicationList">
            {applications.map((application, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    placeholder="Enter Application Name"
                    value={application.name}
                    onChange={(event) => handleNameChange(index, event)}
                  />
                </td>
                <td>
                  <select
                    value={application.status}
                    onChange={(event) => handleStatusChange(index, event)}
                  >
                    <option value="willApply">Will Apply</option>
                    <option value="applied">Applied</option>
                    <option value="accepted">Accepted</option>
                  </select>
                </td>
                <td>
                  {application.status === 'willApply' ? (
                    <button
                      className="btn btn-start-application"
                      onClick={() => navigate('/AddApplication')}
                    >
                      Start Application
                    </button>
                  ) : (
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
