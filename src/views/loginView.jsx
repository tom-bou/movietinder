import "../style.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moviefilm from "../images/moviefilm.png"
import popcorn from "../images/popcorn.png"
import logo from "../images/logo.png"
import glasses from "../images/glasses.png"

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
    <div className="flex flex-col items-center justify-center min-h-screen " style={{ background: 'linear-gradient(to bottom, #150629 60%, #1C0A34, #5A2960)' }}>
      <div className="p-6 rounded-lg shadow-lg bg-white max-w-md w-full border-2 border-violet-800 bg-gradient-to-br from-pink-300 via-violet-400 to-violet-500 z-10">
        <h1 className="text-xl font-semibold text-center text-white mb-4 tracking-wider">LOGIN</h1>
        <input
          className="w-full px-3 py-2 mb-3 border rounded-md focus:outline-none focus:ring focus:border-violet-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-violet-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full px-3 py-2 mb-2 text-white bg-violet-600 rounded-md hover:bg-violet-500"
          onClick={() => onEmailLogin(email, password)}
        >
          Login
        </button>
        <button 
          className="w-full px-3 py-2 text-white bg-violet-900 rounded-md hover:bg-violet-800"
          onClick={onGoogleLogin}
        >
          Sign in with Google
        </button>
        {error && <p className="mt-3 text-sm text-blue-500">{error}</p>}
        <p className="mt-4 text-center">
          Don't have an account? {' '}
          <Link to="/register" className="text-indigo-700 hover:text-indigo-600">
            Register
          </Link>
        </p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-gradient-to-br from-pink-900 via-violet-700 blur-md to-blue-900 rounded-lg absolute top-15 left-15 right-15 bottom-15 z-0" style={{ width: '460px', height:'350px' }}></div>
      <img src={moviefilm} alt="Movie icon" class="absolute left-20 bottom-60 w-60 rotate-6 transform -rotate-3 duration-1000 hover:rotate-[3deg]"/>
      <img src={popcorn} alt="Popcorn icon" class="absolute right-20 bottom-20 w-52 rotate-6 transform rotate-3 duration-1000 hover:rotate-[-3deg]" />
      <img src={logo} alt="Logo icon" class="shadow-inner absolute left-2 top-7 w-40"  style={{ filter: 'drop-shadow(0 0 0.2rem #C772ED)' }} />
      <img src={glasses} alt="Glasses icon" class="absolute right-60 top-20 w-40 -rotate-6 transform rotate-3 duration-1000 hover:rotate-[10deg]" />
      

    </div>
    </div>
    
  );
}

export default LoginView;