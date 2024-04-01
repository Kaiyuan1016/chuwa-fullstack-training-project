import { MailOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthForm from '../../components/AuthForm';
import { authUser } from '../../features/userSlice';

export default function SignIn() {
  const dispatch = useDispatch();
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
      placeholder: 'Password',
      name: 'password',
      type: 'password'
    }
  ];

  const onSubmit = data => {
    console.log(data);
    dispatch(authUser(data)).then(() => {
      navigate(location.state?.from || '/');
    });
  };

  return (
    <div>
      <AuthForm
        buttonText="Sign In"
        onSubmit={onSubmit}
        title="Sign in to your account"
        fields={fields}
      />
      <p>
        <span>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </span>
        <span>
          Forgot password?
        </span>
      </p>
    </div>
  );
}