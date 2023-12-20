import React from 'react';
import '../styles/About.css';
import Layout from '../components/Layout';

function About() {
    return (
      <Layout>
        <div id="about-container">
            <div>
            <div class="about-page">
        <header>
            <h1>About Grower Portal</h1>
        </header>
        <section class="mission-statement">
            <h2>Empowering Growers Through Precision Agriculture</h2>
            <p>At Grower Portal, we are committed to revolutionizing the agricultural landscape by integrating cutting-edge technology into everyday farming practices. Our platform is designed to provide farmers with real-time water sensor data, enabling precise irrigation management that conserves resources and enhances crop yields.</p>
        </section>
        <section class="water-technology">
            <h2>Innovative Water Sensing Technology</h2>
            <p>Our advanced water sensors are the heart of Grower Portal. They provide vital data on soil moisture levels, ensuring that crops receive the right amount of water at the right time. This not only leads to better crop health and increased production but also significantly reduces water waste.</p>
        </section>
        <section class="geolocation-data">
            <h2>Geolocation and CLU Data Integration</h2>
            <p>Grower Portal takes precision a step further by extracting geolocation data from captured images. This information is matched with Common Land Unit (CLU) data to give farmers insight into the soil levels and conditions of their fields. With this knowledge, they can tailor their cultivation strategies to the unique needs of their land.</p>
        </section>
        <section class="vision">
            <h2>Our Vision</h2>
            <p>Our vision is to create a sustainable future where technology and traditional farming techniques merge seamlessly. We strive to provide tools that support growers in making informed decisions that benefit their crops, their community, and the planet.</p>
        </section>
        <section class="join-us">
            <h2>Join Us</h2>
            <p>Join the growing number of farmers who are leveraging Grower Portal to bring about a new era in agriculture. Sign up today to start optimizing your water usage, understanding your soil better, and taking your farming operations to the next level.</p>
        </section>
    </div>

            </div>
            </div>
      </Layout>
    );
}

export default About;
