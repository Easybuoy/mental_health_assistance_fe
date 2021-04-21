import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import { loginUser } from '../../../actions/auth';
import Input from '../../../modules/Common/Input/Input';
import Button from '../../../modules/Common/Button/Button';
import './Login.scss';
import Loader from '../../../modules/Common/Loader/Loader';
const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { addToast } = useToasts();

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(email, password);
    try {
      await dispatch(loginUser(email, password));
    } catch (error) {
      console.log(error, 'err');
      addToast(error, { appearance: 'error' });
    }
    setIsLoading(false);
  };

  if (isAuthenticated) {
    history.push('/');
  }

  return (
    <div className="container login-page">
      <form className="login-container" onSubmit={submit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button disabled={isLoading}>{isLoading ? <Loader /> : 'Login'}</Button>
      </form>
    </div>
  );
};

export default Login;
