import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/auth';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Log the token when the component mounts to check it's being correctly received
    console.log("Token received in frontend:", token);
  }, [token]); // Dependency array with token ensures this runs only when token changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ token, newPassword });
      setMessage('Your password has been updated successfully.');
      setTimeout(() => navigate('/signin'), 3000); // Redirect to signin page after 3 seconds
    } catch (error) {
      setMessage('Failed to reset password. Please try again.');
      console.error('Reset password error:', error);
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
