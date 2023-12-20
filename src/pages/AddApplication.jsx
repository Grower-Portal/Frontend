import React, { useState } from 'react';
import '../styles/AddApplication.css';
import Layout from '../components/Layout';

function AddApplication() {
    const [formData, setFormData] = useState({
        appName: '',
        description: ''
        // Add more fields as necessary
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission logic (e.g., send data to a server)
        console.log(formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <Layout>
        <div className="add-application-container">
            <h1>Add New Application</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Application Name:
                    <input
                        type="text"
                        name="appName"
                        value={formData.appName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                {/* Add more fields as necessary */}
                <button type="submit">Add Application</button>
            </form>
        </div>
        </Layout>
    );
}

export default AddApplication;
