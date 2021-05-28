import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../Common/Image/Image';
import SVG from '../../config/constants/svg';

import { tl8 } from '../../utils/locale';

import './Footer.scss';
import PATHS from '../../config/constants/paths';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-container">
          <p className="text-center ">
            &copy; {new Date().getFullYear()} {tl8('footer.app_name')}
          </p>

          <div className="socials">
            <div className="social">
              <Link to={PATHS.HOME}>
                <Image src={SVG.MAIL} alt={tl8('image_alt.mail')} />
              </Link>
            </div>
            <div className="social">
              <Link to={PATHS.HOME}>
                <Image src={SVG.TWITTER} alt={tl8('image_alt.twitter')} />
              </Link>
            </div>

            <div className="social">
              <Link to={PATHS.HOME}>
                <Image src={SVG.FACEBOOK} alt={tl8('image_alt.facebook')} />
              </Link>
            </div>

            <div className="social">
              <Link to={PATHS.HOME}>
                <Image src={SVG.INSTAGRAM} alt={tl8('image_alt.instagram')} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
