import React, { useState } from 'react';
import { Button } from '../ui/button.tsx';
import { Input } from '../ui/input.tsx';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e, setter) => {
    const value = e.target.value;
    setter(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const currentPhoneNumber = document.getElementById('phoneNumber').value;
    const currentPassword = document.getElementById('password').value;

    if (!currentPhoneNumber || !currentPassword) {
      setError('Please enter phone number and password.');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Frontend: Sending login request for', currentPhoneNumber);

      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: currentPhoneNumber, password: currentPassword }),
      });

      console.log('Frontend: Received response with status:', response.status);

      if (response.ok) {
        console.log('Frontend: Response status is OK. Parsing JSON...');
        const data = await response.json();
        console.log('Frontend: Successfully parsed JSON data:', data);
        console.log('Frontend: User type received:', data.userType);

        console.log('Login successful:', data.message);

        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userType', data.userType);
        console.log('Frontend: Token and userType stored in localStorage.');

        if (data.userType === 'admin') {
          console.log('Frontend: User is admin. Preparing to redirect to admin dashboard...');
          console.log('Frontend: Calling navigate("/admin/dashboard")...');
          navigate('/admin/dashboard');
          console.log('Frontend: navigate("/admin/dashboard") called.');
        } else if (data.userType === 'user') {
          console.log('Frontend: User is regular user. Preparing to redirect to user dashboard...');
          console.log('Frontend: Calling navigate("/user/dashboard")...');
          navigate('/user/dashboard');
          console.log('Frontend: navigate("/user/dashboard") called.');
        } else {
          console.warn('Frontend: Login successful but unexpected userType received from backend:', data.userType);
          setError('Login successful, but user type is unknown.');
        }
      } else {
        console.log('Frontend: Response status is NOT OK. Handling error...');
        const errorData = await response.json();
        console.log('Frontend: Received error data from backend:', errorData);
        setError(errorData.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Frontend: Error during fetch or JSON parsing:', err);
      setError(err.message || 'An error occurred while logging in.');
    } finally {
      console.log('Frontend: Login attempt finished. Setting isLoading to false.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <Input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => handleInputChange(e, setPhoneNumber)}
              required
              className="form-input"
              placeholder="Enter your phone number"
              autoComplete="tel"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              required
              className="form-input"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <Button type="submit" className="login-button w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log in'}
          </Button>
        </form>
        <p className="signup-link">
          Don't have an account?{' '}
          <Link to="/signup" className="signup-link-a"> 
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
