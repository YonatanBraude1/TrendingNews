import React, { useState } from "react";
import axios from 'axios';
import './App.css'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});
        setMessage('');

        // Check for empty fields
        if (!username || !email || !phone || !password || !confirmPassword) {
            setErrors({ form: 'Please fill in all fields.' });
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrors({ form: 'Passwords do not match.' });
            return;
        }

        // Validate email
        if (!email.endsWith('@gmail.com')) {
            setErrors({ form: 'Email must end with @gmail.com.' });
            return;
        }

        // Validate phone number
        if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            setErrors({ form: 'The phone number must be exactly 10 numbers.' });
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/Register', {
                username,
                email,
                phone,
                password,
                confirmPassword
            });

            if (response.data.message === 'registration success') {
                setMessage('You have been signed up successfully.');
                navigate("/");
            } else {
                setErrors({ form: response.data.message });
            }
        } catch (err) {
            console.error(err);
            setErrors({ form: 'Please try again.' });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                <h1 className="text-3xl block text-center font-semibold">
                    <i className="fa-solid fa-user"></i> Register
                </h1>
                <hr className="mt-3" />
                <form onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <label htmlFor="username" className="block text-base mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setErrors(prevErrors => ({ ...prevErrors, username: '' }));
                            }}
                            className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${errors.username ? 'border-red-500' : ''}`}
                            placeholder="Enter Username..."
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>
                    <div className="mt-3">
                        <label htmlFor="email" className="block text-base mb-2">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors(prevErrors => ({ ...prevErrors, email: '' }));
                            }}
                            className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="Enter email..."
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mt-3">
                        <label htmlFor="phone" className="block text-base mb-2">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                                setErrors(prevErrors => ({ ...prevErrors, phone: '' }));
                            }}
                            className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${errors.phone ? 'border-red-500' : ''}`}
                            placeholder="Enter phone..."
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                    <div className="mt-3">
                        <label htmlFor="password" className="block text-base mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors(prevErrors => ({ ...prevErrors, password: '' }));
                            }}
                            className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${errors.password ? 'border-red-500' : ''}`}
                            placeholder="Enter password..."
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="mt-3">
                        <label htmlFor="confirmPassword" className="block text-base mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
                            }}
                            className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            placeholder="Enter confirm Password..."
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                        {errors.passwordMismatch && <p className="text-red-500 text-sm">{errors.passwordMismatch}</p>}
                    </div>
                    <div className="mt-5">
                        <button
                            type="submit"
                            className="border-2 border-bg-gray-800 bg-gray-800 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-gray-800 font-semibold"
                        >
                            <i className="fa-solid fa-right-to-bracket"></i>&nbsp;&nbsp;Register
                        </button>
                    </div>
                    {errors.form && <p className="text-red-500 text-sm mt-3">{errors.form}</p>}
                </form>
            </div>
        </div>
    );
}

export default Register;
