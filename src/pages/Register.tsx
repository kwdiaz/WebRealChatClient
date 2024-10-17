import React, { useState } from 'react';
import { register } from '../services/authService';
import axios from 'axios';

const Register = ({ setIsRegistering }: { setIsRegistering: (value: boolean) => void }) => {
  const [username, setUsername] = useState(''); // State to hold username
  const [password, setPassword] = useState(''); // State to hold password
  const [name, setName] = useState(''); // State to hold user's name
  const [error, setError] = useState(''); // State to hold error messages
  const [loading, setLoading] = useState(false); // State to manage loading state

  const handleRegister = async () => {
    setError(''); // Reset error message
    setLoading(true); // Set loading state

    try {
      // Validate input fields
      if (!username || !password || !name) {
        setError('Please enter a name, username, and password.');
        setLoading(false);
        return;
      }

      // Call register service
      await register(username, password, name);

      alert('Registration successful'); // Notify user of successful registration
      setIsRegistering(false); // Switch back to login
    } catch (err) {
      console.error(err); // Log error to the console
      
      // Type checking and error handling for unknown type
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || 'Error in registration');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error'); // Handle unknown errors
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl mb-4 font-bold text-center text-gray-700">Register</h1>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>} {/* Display error message */}
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name state
          className="border border-gray-300 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state
          className="border border-gray-300 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          className="border border-gray-300 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleRegister} 
          className={`bg-blue-500 text-white px-4 py-2 rounded w-full font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          disabled={loading} // Disable button if loading
        >
          {loading ? 'Loading...' : 'Register'}
        </button>
        <div className="text-center mt-4">
          <p>Already have an account? <button onClick={() => setIsRegistering(false)} className="text-blue-500 underline">Login here</button></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
