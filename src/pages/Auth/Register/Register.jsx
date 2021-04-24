import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import { registerUser } from '../../../actions/auth';
import Input from '../../../modules/Common/Input/Input';
import Button from '../../../modules/Common/Button/Button';
import Loader from '../../../modules/Common/Loader/Loader';
import { tl8 } from '../../../utils/locale';
import PATHS from '../../../config/constants/paths';
import AuthLayout from '../../../layout/AuthLayout/AuthLayout';
import AuthBottom from '../../../modules/Auth/AuthBottom';
import './Register.scss';
import { Link } from 'react-router-dom';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [terms, setTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(
    false
  );
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    if (isRegistrationSuccessful) {
      history.push(PATHS.LOGIN);
    }
  }, [isRegistrationSuccessful, history]);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      email,
      password,
      fullName,
      phone,
      terms,
      userType: 1,
    };
    try {
      await dispatch(registerUser(payload));
      addToast('Registration successful!', { appearance: 'success' });
      setIsRegistrationSuccessful(true);
    } catch (error) {
      if (typeof error === 'string') {
        addToast(error, { appearance: 'error' });
      } else if (Object.keys(error).length > 0) {
        if (error.message) {
          addToast(error.message, { appearance: 'error' });
        }

        if (error.email) {
          addToast(error.email, { appearance: 'error' });
        }

        if (error.fullName) {
          addToast(error.fullName, { appearance: 'error' });
        }

        if (error.password) {
          addToast(error.password, { appearance: 'error' });
        }

        if (error.phone) {
          addToast(error.phone, { appearance: 'error' });
        }

        if (error.terms) {
          addToast(error.terms, { appearance: 'error' });
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="container register-page">
      <AuthLayout>
        <div className="login-container">
          <form onSubmit={submit}>
            <Input
              type="text"
              placeholder={tl8('auth.full_name')}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder={tl8('auth.phone')}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
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
              minLength="8"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              type="checkbox"
              value={terms}
              onChange={(e) => setTerms(e.target.checked)}
              required
              showExtraText
              extrasText={
                <Link to={PATHS.TERMS} target="_blank">
                  {tl8('auth.terms')}
                </Link>
              }
            />

            <Button
              disabled={
                isLoading || (!email && !password && !fullName && !phone)
              }
            >
              {isLoading ? <Loader /> : tl8('auth.sign_up')}
            </Button>
          </form>

          <AuthBottom
            text={tl8('auth.bottom.already_have_account')}
            linkText={tl8('auth.login')}
            path={PATHS.LOGIN}
          />
        </div>
      </AuthLayout>
    </div>
  );
};

export default Register;
