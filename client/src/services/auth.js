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

