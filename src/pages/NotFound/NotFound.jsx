import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Image from '../../modules/Common/Image/Image';
import SVG from '../../config/constants/svg';
import PATHS from '../../config/constants/paths';
import { tl8, tl8Html } from '../../utils/locale';
import './NotFound.scss';

const NotFound = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push(PATHS.HOME);
    }, 3000);
  }, []);

  return (
    <div className="container">
      <div className="not-found-page">
        <Image src={SVG.NOT_FOUND} alt={tl8('image_alt.not_found')} />

        <p>{tl8Html('not_found.title')}</p>
      </div>
    </div>
  );
};

export default NotFound;
