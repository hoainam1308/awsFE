import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auths/register', { email, password, fullname });
      navigate('/login');
    } catch (error) {
      alert('Đăng ký thất bại');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Đăng ký</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={fullname} onChange={e => setFullname(e.target.value)} placeholder="Họ tên"
          className="w-full mb-4 p-2 border rounded" required />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
          className="w-full mb-4 p-2 border rounded" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu"
          className="w-full mb-4 p-2 border rounded" required />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Đăng ký</button>
      </form>
    </div>
  );
}