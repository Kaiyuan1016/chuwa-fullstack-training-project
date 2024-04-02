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
  const url = `http://localhost:8080/api/auth/resetPassword`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, newPassword }),
  });
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || 'Failed to reset password');
  }
  return await response.json();
};

