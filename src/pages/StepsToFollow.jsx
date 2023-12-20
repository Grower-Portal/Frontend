import React from 'react';
import '../styles/StepsToFollow.css';
import Layout from '../components/Layout';

function StepsToFollow() {
    return (
        <Layout>
            <div className="steps-to-follow">
                <h1>How to Fill Out Your Application - Grower Portal</h1>

                <ol id="steps-container">
                    <li>
                        Access the Application Form: Navigate to the "Add Application" section on the Grower Portal.
                    </li>
                    <li>
                        Enter Basic Information: Fill in basic details such as your Farm Number and Tract Number.
                    </li>
                    <li>
                        Provide Detailed Information: Enter specific details about your farm, including Commodity Type, Grower Field Name, and FSA Physical Location.
                    </li>
                    <li>
                        Upload Necessary Documents: Attach any required documents, such as proof of ownership or land use documentation, in the Document Upload section.
                    </li>
                    <li>
                        Review Your Application: Ensure all the information provided is accurate and complete.
                    </li>
                    <li>
                        Submit Your Application: Click the "Submit Application" button. You will receive a confirmation once your application has been successfully submitted.
                    </li>
                    <li>
                        Await Confirmation: After submission, your application will be reviewed, and you will be notified about the approval status via email or on the portal.
                    </li>
                </ol>
            </div>
        </Layout>
    );
}

export default StepsToFollow;
