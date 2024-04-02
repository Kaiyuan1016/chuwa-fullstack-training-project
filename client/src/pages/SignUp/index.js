import React from 'react';
import { MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import { signUpUser } from '../../features/userSlice';

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fields = [
    {
      placeholder: 'Email',
      name: 'email',
      type: 'text',
      prefix: <MailOutlined />,
      rules: [
        {
          required: true,
          message: 'Please input your email!'
        }
      ]
    },
    {
      placeholder: 'Password',
      name: 'password',
      type: 'password',
      rules: [
        {
          required: true,
          message: 'Please input your password!'
        }
      ]
    }
  ];

  const onSubmit = data => {
    dispatch(signUpUser(data)).then(() => navigate('/signin'));
  };
  return (
    <div style={{
      height: 'calc(100vh - 64px - 69px)',
      padding: '0 50px',
      width: '440px',
      margin: '0 auto',
      overflowY: 'auto'
    }}>
      <AuthForm
        buttonText="Create account"
        onSubmit={onSubmit}
        title="Sign up an account"
        fields={fields}
      />
    </div>
  );
}