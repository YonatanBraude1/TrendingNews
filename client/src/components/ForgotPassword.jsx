import React, { useState } from "react";
import axios from 'axios'; // Ensure axios is installed and imported
import { useNavigate } from 'react-router-dom';
function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleForgotPassword = async (event) => {
        event.preventDefault();
        setErrors({});
        setMessage('');
        if (!email || !newPassword || !confirmPassword) {
            setErrors({ form: 'Please fill in all fields.' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrors({ form: 'Passwords do not match.' });
            return;
        }
        try {
            
            const response = await axios.post('http://localhost:3001/ForgotPassword', { email, newPassword });
            if (response.data.message === 'Password reset success') {
                setMessage('Password has been successfully reset.');
                navigate("/Login");
            } else {
                setErrors({ form: response.data.message });
            }
        } catch (err) {
            console.error(err);
            setErrors({ form: 'An error occurred. Please try again later.' });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                <h1 className="text-3xl block text-center font-semibold">
                    <i className="fa-solid fa-lock"></i> Forgot Password
                </h1>
                <hr className="mt-3" />
                <form onSubmit={handleForgotPassword}>
                    <div className="mt-3">
                        <label htmlFor="email" className="block text-base mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="Enter your email..."
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mt-3">
                        <label htmlFor="newPassword" className="block text-base mb-2">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${errors.newPassword ? 'border-red-500' : ''}`}
                            placeholder="Enter new password..."
                        />
                        {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
                    </div>
                    <div className="mt-3">
                        <label htmlFor="confirmPassword" className="block text-base mb-2">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            placeholder="Confirm new password..."
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>
                    {errors.form && <p className="text-red-500 text-sm mt-3">{errors.form}</p>}
                    {message && <p className="text-green-500 text-sm mt-3">{message}</p>}
                    <div className="mt-5">
                        <button
                            type="submit"
                            className="border-2 border-bg-gray-800 bg-gray-800 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-gray-800 font-semibold"
                        >
                            <i className="fa-solid fa-key"></i>&nbsp;&nbsp;Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
