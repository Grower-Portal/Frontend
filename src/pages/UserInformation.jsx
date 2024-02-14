import React from 'react';
import '../styles/UserInformation.css';
import Layout from '../components/Layout';

function UserInformation() {

    const user = {
        Name: localStorage.getItem('firstName') + " " + localStorage.getItem('lastName'), 
        email: localStorage.getItem('email'),
        phone: localStorage.getItem('phone'),
        address: localStorage.getItem('address'),
        dob: localStorage.getItem('dob')
    };

    return (
        <Layout>
        <div id="user-info-container">
            <h1>User Information</h1>
            <p className="user-attribute">Name: {user.Name || "Not Found"}</p>
            <p className="user-attribute">Email: {user.email || "Not Found"}</p>
            <p className="user-attribute">Phone Number: {user.phone  || "Not Found"}</p>
            <p className="user-attribute">Address: {user.address || "Not Found"}</p>
            <p className="user-attribute">Date of Birth: {user.dob || "Not Found"}</p>
        </div>
        </Layout>
    );
}

export default UserInformation;
