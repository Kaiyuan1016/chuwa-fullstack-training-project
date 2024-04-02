import { MailOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

export default function ResetPassword() {
//   const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fields = [
    {
      placeholder: 'Email',
      name: 'email',
      type: 'text',
      prefix: <MailOutlined />
    },
    {
      placeholder: 'New Password',
      name: 'newPassword',
      type: 'password'
    }
  ];

  const onSubmit = async(data) => {
    console.log(data);
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const payload = {
        email: data.email,
        newPassword: data.newPassword
    };
    try {
        const response = await axios.post(`http://localhost:8080/api/auth/resetpassword?token=${token}`, payload);
        console.log(response.data);
        console.log(response.status);
        if(response.status == 200) {
            navigate('/resetpassword/success', { state: { message: response.data }});
        } else if(response.status == 400){
            navigate('/*', {state: {message: 'Sorry! Reset password failed'}});
        }
    } catch(err) {
        console.error('Error posing reset password:', err);
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
        buttonText="Reset Password"
        onSubmit={onSubmit}
        title="Reset your password"
        fields={fields}
      />
      <p>
        <span>
        </span>
      </p>
    </div>
  );
}