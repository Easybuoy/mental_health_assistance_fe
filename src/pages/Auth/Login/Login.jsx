import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../actions/auth';
import Input from '../../../modules/Common/Input/Input';
import Button from '../../../modules/Common/Button/Button';
import './Login.scss';

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // dispatch(setError('Username or Password Incorrect.'))

  const submit = async (e) => {
    try {
      await dispatch(loginUser('ekunolaeasybuoy@gmail.com', '12345678'));
    } catch (error) {
      console.log(error, 'err');
    }
  };

  if (isAuthenticated) {
    history.push('/');
  }

  return (
    <div className="container login-page">
      Login
      <div className="login-container">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button onClick={submit}>Submit</Button>
      </div>
    </div>
  );
};

export default Login;
