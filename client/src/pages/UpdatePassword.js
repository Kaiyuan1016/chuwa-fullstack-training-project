import React, { useState } from 'react';
import { sendPasswordResetEmail } from '../services/auth';

const UpdatePassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendPasswordResetEmail(email); // Capture the response
      console.log("Email sent response:", response); // Log the successful response for debugging
      setMessage('Check your email for the password reset link.');
    } catch (error) {
        console.error("Error sending password reset email:", error);
        // Updated error handling logic
        const errorMessage = error.response && error.response.data && error.response.data.message 
                             ? error.response.data.message 
                             : error.message ? error.message : "Please try again later.";
        setMessage(`Failed to send password reset email. ${errorMessage}`);
    }
  };
  

  return (
    <div>
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdatePassword;
