import { MailOutlined } from '@ant-design/icons';
import {  useNavigate, } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

export default function ForgotPassword() {
    const navigate = useNavigate();
  const fields = [
    {
      placeholder: 'Email',
      name: 'email',
      description: 'Enter your email link, we will send you a recovery link',
      type: 'text',
      prefix: <MailOutlined />
    }
  ];

  const onSubmit = async (email) => {
    console.log(email);
    const response = await axios.post('http://localhost:8080/api/auth/forgotpassword', email);
    console.log(response);
    if(response === undefined) {
        navigate('/*');
    } else {
        navigate('/forgotpassword/success', { message: 'We have sent the update password link to your emial, please check that ！' });
    }
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
        buttonText="Update password"
        onSubmit={onSubmit}
        title="Update your password"
        fields={fields}
      />
    </div>
  );
}