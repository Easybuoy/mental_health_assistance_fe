import React from 'react';
import { tl8, tl8Html } from '../../utils/locale';

const Profile = () => {
  return (
    <div className="container">
      <h2 className="text-center page-title">
        {tl8('profile.page_title')}
      </h2>
      <p className="page-description">
        {tl8Html('profile.page_description', { className: 'danger-text' })}
      </p>
    </div>
  );
};

export default Profile;
