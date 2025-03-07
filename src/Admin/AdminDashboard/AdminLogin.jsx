import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginWelcome from "../../assets/AdminWelcome.avif";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/portal/admin/login', { email, password });
      localStorage.setItem("isAdminAuthenticated", "true");
      alert(res.data.message);
      navigate('/Admin-dashboard'); // Redirect on success
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <section className='bg-gray-100 min-h-screen flex items-center justify-center'>
      <div className='bg-gray-200 flex rounded-2xl shadow-lg max-w-3xl p-5'>
        <div className='sm:w-1/2 px-16'>
          <h1 className='font-bold text-2xl text-Navy'>Login</h1>
          
          {error && <p className="text-red-600">{error}</p>}

          <form className='flex flex-col gap-6' onSubmit={handleLogin}>
            <input 
              className='p-2 mt-4 rounded-xl border' 
              type="email" 
              placeholder='College Email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
            <input 
              className='p-2 mt-4 rounded-xl border' 
              type="password" 
              placeholder='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <button type="submit" className='bg-Navy text-white py-2 rounded-xl mt-4 mb-2 hover:bg-red-950'>
              Login
            </button>
          </form>

          <div className='mt-10 grid grid-cols-3 items-center text-gray-400'>
            <hr className='border-gray-500'/>
            <p className='text-center'>OR</p>
            <hr className='border-gray-500'/>
          </div>

          <button className='bg-Navy text-white py-2 rounded-xl mt-4 mb-4 w-full hover:bg-green-600' onClick={() => navigate('/')}>
            Home
          </button>
        </div>

        <div className='sm:block hidden w-1/2'>
          <img className='rounded-2xl h-full' src={LoginWelcome} alt="Welcome" />
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
