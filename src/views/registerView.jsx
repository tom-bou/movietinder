import React, { useState } from 'react';
import ErrorModal from './errorModal';
import { Link } from 'react-router-dom';

function RegisterView({ onRegister, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setShowModal(true);
      return;
    }
    await onRegister(email, password);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 rounded-lg shadow-lg bg-white max-w-md w-full">
        <h1 className="text-xl font-semibold text-center text-gray-700 mb-4">Register</h1>
        <input
          className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="w-full px-3 py-2 mb-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={handleRegister}
        >
          Register
        </button>
        {showModal && <ErrorModal message={error || 'Passwords do not match'} onClose={handleCloseModal} />}
        <p className="mt-4 text-center">
          Already have an account? {' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterView;
