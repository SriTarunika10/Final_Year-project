import React, { useState } from 'react';
import './ForgotPassword.css'; // Create this CSS file    // Create this CSS file

// ForgotPassword Component
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Basic email validation
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setError('Invalid email address.');
      return;
    }

    try {
      //  Send password reset email (replace with your actual API endpoint)
      //   const response = await fetch('/api/forgot-password', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ email }),
      //   });

      //   const data = await response.json();

      //   if (response.ok) {
      //     setMessage(data.message || 'Password reset link sent to your email.');
      //   } else {
      //     setError(data.error || 'Failed to send reset email.');
      //   }
      // Simulate API response
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setMessage('Password reset link sent to your email. Check your inbox!');

    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="forgot-password-input"
          required
        />
        <button type="submit" className="forgot-password-button">Send Reset Link</button>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
};
export default ForgotPassword;