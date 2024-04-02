import apiCall from './api';

export const signUp = async data => {
  return await apiCall({
    url: '/api/auth/signup',
    method: 'POST',
    data
  });
};

export const signIn = async data => {
  return await apiCall({
    url: '/api/auth/signin',
    method: 'POST',
    data
  });
};

export const sendPasswordResetEmail = async (email) => {
  const data = { email };
  return await apiCall({
    url: '/api/auth/requestPasswordReset',
    method: 'POST',
    data
  });
};

export const resetPassword = async ({ token, newPassword }) => {
  const response = await fetch('/api/auth/resetPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, newPassword }),
  });
  if (!response.ok) {
    throw new Error('Failed to reset password');
  }
  return await response.json();
};

