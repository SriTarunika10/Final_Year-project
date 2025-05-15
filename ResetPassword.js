import React, { useState, useEffect } from 'react';
import './ResetPassword.css'; // Create this CSS file
const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
  
      useEffect(() => {
          setToken("dummy_reset_token");
      }, []);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setMessage('');
  
      if (!password) {
        setError('Please enter your new password.');
        return;
      }
       if (password.length < 8) {
          setError('Password must be at least 8 characters');
          return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!token) {
        setError("Invalid or missing token.  Cannot reset password.");
        return;
      }
  
      try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          setMessage('Password reset successfully! You will be redirected to login in 2 seconds...');
          setTimeout(() => {
              console.log("Redirecting to login page");
          }, 2000);
  
      } catch (err) {
        setError('An error occurred. Please try again later.');
        console.error(err);
      }
    };
  
    return (
      <div className="reset-password-container">
        <h2 className="reset-password-title">Reset Password</h2>
        <form onSubmit={handleSubmit} className="reset-password-form">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="reset-password-input"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="reset-password-input"
            required
          />
          <button type="submit" className="reset-password-button">Reset Password</button>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
        </form>
      </div>
    );
  };
  
export default ResetPassword;