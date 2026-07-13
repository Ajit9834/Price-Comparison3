import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api';

function SignupForm({ setUser }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup(username, email, password);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      setUser(data);
      navigate('/'); // Redirect to home page
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;