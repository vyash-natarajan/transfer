import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation after login

const users = {
  UC: { username: 'uc_user', password: 'uc_pass' },
  FA: { username: 'fa_user', password: 'fa_pass' },
  LIB: { username: 'lib_user', password: 'lib_pass' },
  EBB: { username: 'ebb_user', password: 'ebb_pass' },
  SSW: { username: 'ssw_user', password: 'ssw_pass' },
  COBA: { username: 'coba_user', password: 'coba_pass' },
  'Starbucks UC': { username: 'starbucks_uc_user', password: 'starbucks_uc_pass' },
  'Starbucks West': { username: 'starbucks_west_user', password: 'starbucks_west_pass' },
  Panera: { username: 'panera_user', password: 'panera_pass' },
  CFA: { username: 'cfa_user', password: 'cfa_pass' },
  Panda: { username: 'panda_user', password: 'panda_pass' },
  Subway: { username: 'subway_user', password: 'subway_pass' },
  Cabo: { username: 'cabo_user', password: 'cabo_pass' },
};

function Login() {
  const [location, setLocation] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // To navigate to the transfer system after login

  const handleLogin = () => {
    if (!location || !username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const user = users[location];
    if (user && user.username === username && user.password === password) {
      // Successful login, navigate to the transfer system page
      navigate('/transfer-system');  // Assumes you have a route for the transfer system page
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <label htmlFor="location">Select Location:</label>
      <select
        id="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="">Select Location</option>
        <option value="UC">UC</option>
        <option value="FA">FA</option>
        <option value="LIB">LIB</option>
        <option value="EBB">EBB</option>
        <option value="SSW">SSW</option>
        <option value="COBA">COBA</option>
        <option value="Starbucks UC">Starbucks UC</option>
        <option value="Starbucks West">Starbucks West</option>
        <option value="Panera">Panera</option>
        <option value="CFA">CFA</option>
        <option value="Panda">Panda</option>
        <option value="Subway">Subway</option>
        <option value="Cabo">Cabo</option>
      </select>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
