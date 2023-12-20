import React from 'react';
import '../styles/ContactUs.css';
import Layout from '../components/Layout';

function ContactUs() {
    // For a real-world scenario, you might fetch these details from an API or environment variables.
    const contactDetails = {
        phoneNumber: 'Your Phone Number',
        emailAddress: 'Your Email Address'
    };

    const openChat = () => {
        // Replace the link with your actual chat system link
        window.open('https://example.com/chat', '_blank');
    };

    return (
        <Layout>
        <div id="contact-container">
            <h1>Contact Us</h1>
            <p className="contact-detail">Phone number: <span id="phone">{contactDetails.phoneNumber}</span></p>
            <p className="contact-detail">Email: <span id="email">{contactDetails.emailAddress}</span></p>
            <p>
                We aim to respond within 24 hours. Feel free to reach out to us with any inquiries,
                and we'll get back to you as soon as possible.
            </p>
            <p className="contact-detail">Chat Us: <span className="chat-link" onClick={openChat}>Start Chat</span></p>
        </div>
        </Layout>
    );
}

export default ContactUs;
