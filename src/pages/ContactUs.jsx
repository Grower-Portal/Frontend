import React from 'react';
import '../styles/ContactUs.css';
import Layout from '../components/Layout';

function ContactUs() {
    // For a real-world scenario, you might fetch these details from an API or environment variables.
    const contactDetails = {
        emailAddress: 'growerportal@supremerice.com'
    };

    return (
        <Layout>
        <div id="contact-container">
            <h1>Contact Us</h1>
            <p className="contact-detail">Email: <span id="email">{contactDetails.emailAddress}</span></p>
            <p>
                We aim to respond within 24 hours. Feel free to reach out to us with any inquiries,
                and we'll get back to you as soon as possible.
            </p>
        </div>
        </Layout>
    );
}

export default ContactUs;
