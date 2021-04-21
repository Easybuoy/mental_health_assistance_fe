import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import { loginUser } from '../../../actions/auth';
import Input from '../../../modules/Common/Input/Input';
import Button from '../../../modules/Common/Button/Button';
import './Login.scss';
import Loader from '../../../modules/Common/Loader/Loader';
import { tl8 } from '../../../utils/locale';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { addToast } = useToasts();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated, history]);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(loginUser(email, password));
    } catch (error) {
      addToast(error, { appearance: 'error' });
    }
    setIsLoading(false);
  };

  return (
    <div className="container login-page">
      <form className="login-container" onSubmit={submit}>
        <Input
          type="email"
          placeholder={tl8('auth.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder={tl8('auth.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button disabled={isLoading}>{isLoading ? <Loader /> : tl8('auth.login')}</Button>
      </form>
    </div>
  );
};

export default Login;
