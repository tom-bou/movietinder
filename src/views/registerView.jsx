import React, { useState } from 'react';
import ErrorModal from './errorModal';
import { Link } from 'react-router-dom';
import moviefilm from "../images/moviefilm.png"
import popcorn from "../images/popcorn.png"
import logo from "../images/logo.png"
import glasses from "../images/glasses.png"

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
    <div className="flex flex-col items-center justify-center min-h-screen " style={{ background: 'linear-gradient(to bottom, #150629 60%, #1C0A34, #5A2960)' }}>
      <div className="p-6 rounded-lg shadow-lg bg-white max-w-md w-full border-2 border-violet-800 bg-gradient-to-br from-pink-300 via-violet-400 to-violet-500 z-10">
        <h1 className="text-xl font-semibold text-center text-white mb-4 tracking-wider">REGISTER</h1>
        <input
          className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring focus:border-violet-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring focus:border-violet-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-violet-400"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="w-full px-3 py-2 mb-2 text-white bg-violet-900 rounded-md hover:bg-violet-800"
          onClick={handleRegister}
        >
          Register
        </button>
        {showModal && <ErrorModal message={error || 'Passwords do not match'} onClose={handleCloseModal} />}
        <p className="mt-4 text-center">
          Already have an account? {' '}
          <Link to="/login" className="text-indigo-700 hover:text-indigo-600">
            Log in
          </Link>
        </p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-gradient-to-br from-pink-900 via-violet-700 blur-md to-blue-900 rounded-lg absolute top-15 left-15 right-15 bottom-15 z-0" style={{ width: '460px', height:'350px' }}></div>
      <img src={moviefilm} alt="Movie icon" class="absolute left-20 bottom-60 w-60"/>
      <img src={popcorn} alt="Popcorn icon" class="absolute right-20 bottom-20 w-52" />
      <img src={logo} alt="Logo icon" class="shadow-inner absolute left-4 top-4 w-36"  style={{ filter: 'drop-shadow(0 0 0.2rem #C772ED)' }} />
      <img src={glasses} alt="Glasses icon" class="absolute right-60 top-20 w-40" />
      

    </div>
    </div>
  );
}

export default RegisterView;
