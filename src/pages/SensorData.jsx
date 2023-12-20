import React from 'react';
import '../styles/SensorData.css';
import Layout from '../components/Layout';

function SensorData() {
    const sensor = {
        location: "Field XYZ",
        uniqueID: "ABC123",
        depth: "10 inches"
    };

    return (
        <Layout>
            <h1>Sensor Data Dashboard</h1>

            <div id="sensor-data-container">
                <h2>Sensor Data</h2>
                <p className="sensor-attribute">Sensor Data Metrics:</p>
                <p className="sensor-attribute">Location: {sensor.location}</p>
                <p className="sensor-attribute">Unique ID: {sensor.uniqueID}</p>
                <p className="sensor-attribute">Depth: {sensor.depth}</p>
            </div>
        </Layout>
    );
}

export default SensorData;
