import React from 'react';
import '../styles/StepsToFollow.css';
import Layout from '../components/Layout';

function StepsToFollow() {

    return (
        <Layout>
        <div>
            <h1>Steps to Follow - Grower Portal</h1>

            <div id="steps-container">
                <h2>Steps to Follow</h2>

                <div className="step">1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                <div className="step">2. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <div className="step">3. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</div>
                <div className="step">4. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</div>
                <div className="step">5. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.</div>
            </div>
        </div>
        </Layout>
    );
}

export default StepsToFollow;
