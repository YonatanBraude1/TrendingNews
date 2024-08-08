import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/Login', { username, password });

            if (response.data.message === 'Login success') {
                const user = response.data;
                localStorage.setItem('userId', user._id);
                console.log('User ID saved to localStorage:', user._id);
                navigate("/Profile"); // Navigate to Profile page on successful login
            } else {
                setErrors({ form: response.data.message });
            }
        } catch (err) {
            console.error(err);
            setErrors({ form: 'Username or password is incorrect, Please try again.' });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                <h1 className="text-3xl block text-center font-semibold">
                    <i className="fa-solid fa-user"></i> Login
                </h1>
                <hr className="mt-3" />
                <form onSubmit={handleLogin}>
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
                    {errors.form && <p className="text-red-500 text-sm mt-3">{errors.form}</p>}
                    <div className="mt-5 flex justify-between items-center">
                        <button
                            type="submit"
                            className="border-2 border-bg-gray-800 bg-gray-800 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-gray-800 font-semibold"
                        >
                            <i className="fa-solid fa-right-to-bracket"></i>&nbsp;&nbsp;Login
                        </button>
                    </div>
                </form>
                <Link to="/ForgotPassword" className="text-blue-500 hover:underline">
                    Forgot Password?
                </Link>
            </div>
        </div>
    );
}

export default Login;
