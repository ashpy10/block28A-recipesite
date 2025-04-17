import React, { useState, useContext } from 'react';
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password); 
    navigate('/'); 
  };

  return (
    <div className="auth-container">
      <h2>Welcome to Your Favorite Flavor Rewind</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button className='auth-button' type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login
