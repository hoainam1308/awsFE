import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';
import './Login.css'; // 💡 tạo file CSS riêng

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auths/login', { email, password }, { withCredentials: true });
      setUser(res.data.data);
      navigate('/');
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:3000/auths/google-login', {
        token: credentialResponse.credential,
      }, { withCredentials: true });
      alert('Google login successful');
      setUser(res.data.data);
      navigate('/');
    }
    catch (err) {
      console.error(err);
      alert('Google login failed');
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google login failed:', error);
    alert('Google login failed');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Đăng nhập</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="📧 Email"
            className="login-input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="🔒 Mật khẩu"
            className="login-input"
            required
          />
          <button type="submit" className="login-button">Đăng nhập</button>
        </form>
        <div className="login-divider">Hoặc</div>
        <div className="google-login">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={handleGoogleFailure}
          />
        </div>
      </div>
    </div>
  );
}
