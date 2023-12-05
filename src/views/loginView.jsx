import "../style.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginView(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onEmailLogin = async (email, password) => {
    await props.onEmailLogin(email, password);
  };

  const onGoogleLogin = async () => {
    await props.onGoogleLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 rounded-lg shadow-lg bg-white max-w-md w-full">
        <h1 className="text-xl font-semibold text-center text-gray-700 mb-4">Login</h1>
        <input
          className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full px-3 py-2 mb-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={() => onEmailLogin(email, password)}
        >
          Login
        </button>
        <button 
          className="w-full px-3 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          onClick={onGoogleLogin}
        >
          Sign in with Google
        </button>
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        <p className="mt-4 text-center">
          Don't have an account? {' '}
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginView;
