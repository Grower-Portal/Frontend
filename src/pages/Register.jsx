import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function Register() {
    const [formValues, setFormValues] = useState({
        firstname: '',
        middlename: '',
        lastname: '',
        suffix: '',
        dob: null,
        password: '',
        confirmPassword: '',
        email: '',
        address: '',
        phoneNumber: '',
        otp: '',
        emailValid: true,
        phoneValid: true,
        showSignupForm: true,
        showOtpForm: false,
        verificationMessage: '',
    });

    const maxDate = new Date();
    const minDate = new Date(1999, 0, 1);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'phoneNumber'){

            // Remove all non-numeric characters
            const numericValue = value.replace(/\D/g, '');

            // Format the numeric value with hyphens
            let formattedValue = '';
            if (numericValue.length > 0) {
                formattedValue = numericValue.slice(0, 3);
                if (numericValue.length > 3) {
                    formattedValue += `-${numericValue.slice(3, 6)}`;
                }
                if (numericValue.length > 6) {
                    formattedValue += `-${numericValue.slice(6, 10)}`;
                }
            }

            setFormValues({
                ...formValues,
                [name]: formattedValue,
            });
        } else{
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    };

    const handleDateChange = (date) => {
        if (date >= minDate && date <= maxDate) {
            setFormValues({
                ...formValues,
                dob: date,
            });
        } else {
            alert('Please select a valid date');
        }
    };

    const validateEmail = (email) => {
        const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return regex.test(email);
    };

    const validateFields = () => {
        const {
            firstname,
            lastname,
            dob,
            email,
            password,
            confirmPassword,
            phoneNumber,
            address,
        } = formValues;

        return (
            firstname.trim() !== '' &&
            lastname.trim() !== '' &&
            dob !== null &&
            email.trim() !== '' &&
            password.trim() !== '' &&
            confirmPassword.trim() !== '' &&
            phoneNumber.trim() !== '' &&
            address.trim() !== ''
        );
    };

    const verifyEmail = () => {
        const { email } = formValues;

        if (!validateFields()) {
            setFormValues({
                ...formValues,
                verificationMessage: 'Please fill in all mandatory fields.',
            });
            return;
        }

        if (!validateEmail(email)) {
            setFormValues({
                ...formValues,
                emailValid: false,
                verificationMessage: 'Please provide a valid email address.',
            });
            return;
        }

        axios.post(`http://localhost:8080/api/farmers/send-verification-code?email=${email}`)
        .then((response) => {
            // Handle the response here
            // The backend should have sent the OTP to the provided email
            // You can update the UI to show OTP verification section
            // For now, let's assume the OTP has been sent successfully
            alert(`OTP sent to ${email}`);
            setFormValues({
                ...formValues,
                showSignupForm: false,
                showOtpForm: true,
                verificationMessage: '',
            });
        })
        .catch((error) => {
            // Handle errors (e.g., network errors or server errors)
            console.error(error);
            setFormValues({
                ...formValues,
                verificationMessage: 'Failed to send OTP. Please try again later.',
            });
        });

    };

    // const handleOtpVerification = () => {
    //     const { otp } = formValues;
    //     const generatedOtp = '123456'; // Replace with the actual OTP sent to the user

    //     if (otp === generatedOtp) {
    //         setFormValues({
    //             ...formValues,
    //             verificationMessage: 'OTP verification successful! You are registered on Grower Portal, you are now able to Login.',
                
                
    //         });

    //     } else {
    //         setFormValues({
    //             ...formValues,
    //             verificationMessage: 'OTP verification failed. Please try again.',
    //         });
    //     }
    // };

    const handleOtpVerification = () => {
        const { email, otp } = formValues;

        const userData = {
            firstName: formValues.firstname,
            lastName: formValues.lastname,
            middlename: formValues.middlename,
            suffix: formValues.suffix,
            dateOfBirth: formValues.dob.toISOString().split('T')[0], // Format date as "YYYY-MM-DD"
            //username: formValues.email, // You can set this to any appropriate value
            password: formValues.password,
            confirmPassword: formValues.confirmPassword,
            email: formValues.email,
            address: formValues.address,
            phoneNumber: formValues.phoneNumber,
        };
    
        // Make an HTTP POST request to the verification endpoint
        axios.post(`http://localhost:8080/api/farmers/verify-otp?email=${email}&otp=${otp}`, userData, {
            headers: {
                'Content-Type': 'application/json',
                'accept': '*',
            },
        })
            .then((response) => {
                // Handle the response here
                    // OTP verification and registration successful
                    setFormValues({
                        ...formValues,
                        verificationMessage: 'OTP verification successful! You are registered on Grower Portal, you are now able to Login.',
                        
                        
                    });
                // else {
                //     // OTP verification failed
                //     // Handle the error (e.g., display an error message)
                //     setFormValues({
                //         ...formValues,
                //         verificationMessage: 'OTP verification failed. Please try again.',
                //     });
                // }
            })
            .catch((error) => {
                // Handle errors (e.g., network errors or server errors)
                console.error(error);
                alert('Failed to verify OTP and register. Please try again later.');
            });
    };

    const renderErrorMessage = (fieldName, message) => {
        if (!formValues[fieldName] && formValues.verificationMessage) {
            return <p className="error-message">{message}</p>;
        }
        return null;
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            {formValues.showSignupForm && (
                <form>
                    <div className="form-group">
                        <label htmlFor="first-name">
                            First Name<span>*</span>:
                        </label>
                        <input
                            type="text"
                            id="first-name"
                            name="firstname"
                            placeholder="First Name"
                            value={formValues.firstname}
                            onChange={handleChange}
                            required
                        />
                        {renderErrorMessage('firstname', 'First Name is required.')}
                    </div>
                    <div className="form-group">
                        <label htmlFor="middle-name">
                            Middle Name
                        </label>
                        <input
                            type="text"
                            id="middle-name"
                            name="middlename"
                            value={formValues.middlename}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last-name">
                            Last Name<span>*</span>:
                        </label>
                        <input
                            type="text"
                            id="last-name"
                            name="lastname"
                            value={formValues.lastname}
                            onChange={handleChange}
                            required
                        />
                        {renderErrorMessage('lastname', 'Last Name is required.')}
                    </div>
                    <div className="form-group">
                        <label htmlFor="suffix">
                            Suffix
                        </label>
                        <input
                            type="text"
                            id="suffix"
                            name="suffix"
                            value={formValues.suffix}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">
                            Date of Birth<span>*</span>:
                        </label><br/>
                        <DatePicker
                            id="dob"
                            selected={formValues.dob}
                            onChange={handleDateChange}
                            dateFormat="MM-dd-yyyy"
                            showYearDropdown
                            showMonthDropdown
                            yearDropdownItemNumber={120}
                            scrollableYearDropdown
                            isClearable={false}
                            maxDate={maxDate}
                            className="date-picker-input"
                            required
                        />
                        {renderErrorMessage('dob', 'Date of Birth is required.')}
                    </div>
                    <div className="form-group">
                        <label htmlFor="enter-email">
                            Enter Email<span>*</span>:
                        </label>
                        <input
                            type="email"
                            id="enter-email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            required
                            className={!formValues.emailValid ? 'error' : ''}
                        />
                        {renderErrorMessage('email', 'Email is required.')}
                    </div>
                    <div className="form-group">
                        <label htmlFor="create-password">
                            Create Password<span>*</span>:
                        </label>
                        <input
                            type="password"
                            id="create-password"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                            required
                        />
                        {renderErrorMessage('password', 'Password is required.')}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">
                            Confirm Password<span>*</span>:
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {renderErrorMessage('confirmPassword', 'Confirm Password is required.')}
                    </div>
                    <div className="form-group">
                        <label htmlFor="us-phone">
                            Phone Number<span>*</span>:
                        </label>
                        <br />
                        <input
                            type="tel"
                            id="us-phone"
                            name="phoneNumber"
                            value={formValues.phoneNumber}
                            onChange={handleChange}
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            placeholder="123-456-7890"
                            required
                            className={!formValues.phoneValid ? 'error' : ''}
                        />
                        {renderErrorMessage('phoneNumber', 'Phone Number is required.')}
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">
                            Address<span>*</span>:
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formValues.address}
                            onChange={handleChange}
                            required
                        />
                        {renderErrorMessage('address', 'Address is required.')}
                    </div>
                    <button type="button" onClick={verifyEmail}>
                        Verify Email
                    </button>
                    <p className="error-message">{formValues.verificationMessage}</p>
                </form>
            )}
            {formValues.showOtpForm && (
                <div>
                    <h2>OTP Verification</h2>
                    <p>Enter the OTP sent to your email:</p>
                    <input
                        type="text"
                        value={formValues.otp}
                        onChange={(e) => setFormValues({ ...formValues, otp: e.target.value })}
                    />
                    <button 
                        type="button" 
                        onClick={handleOtpVerification}
                        disabled={formValues.verificationMessage.includes('successful')}
                        className={formValues.verificationMessage.includes('successful') ? 'disabled-button' : ''}>
                        Verify OTP
                    </button>
                    <p>{formValues.verificationMessage}</p>
                </div>
            )}
            <Link to="/SignIn" className="back-to-login">
                Back to Login
            </Link>
        </div>
    );
}

export default Register;
