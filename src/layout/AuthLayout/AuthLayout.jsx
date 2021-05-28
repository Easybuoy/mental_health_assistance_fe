import React from 'react';
import Background from '../../assets/images/background.jpg';
import Image from '../../modules/Common/Image/Image';
import { tl8 } from '../../utils/locale';
import './AuthLayout.scss';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="image">
        <Image src={Background} alt={tl8('image_alt.auth')}/>
      </div>

      <div className="content">{children}</div>
    </div>
  );
};

export default AuthLayout;
