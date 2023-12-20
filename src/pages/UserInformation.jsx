import React from 'react';
import '../styles/UserInformation.css';
import Layout from '../components/Layout';

function UserInformation() {

    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 123-456-7890",
        address: "123 Main Street, City, Country",
        dob: "January 1, 1990"
    };

    return (
        <Layout>
        <div id="user-info-container">
            <h1>User Information</h1>
            <p className="user-attribute">Name: {user.name}</p>
            <p className="user-attribute">Email: {user.email}</p>
            <p className="user-attribute">Phone Number: {user.phone}</p>
            <p className="user-attribute">Address: {user.address}</p>
            <p className="user-attribute">Date of Birth: {user.dob}</p>
        </div>
        </Layout>
    );
}

export default UserInformation;
