import React from 'react';
import { SpinnerCircular } from 'spinners-react';

import COLORS from '../../../config/constants/colors';

const Loader = ({ size, thickness, className }) => {
  return (
    <div className={className}>
      <SpinnerCircular
        size={size}
        thickness={thickness}
        speed={100}
        color={COLORS.BRAND_PRIMARY}
        secondaryColor={COLORS.WHITE}
      />
    </div>
  );
};

Loader.defaultProps = {
  size: 15,
  thickness: 200,
  className: '',
};

export default Loader;
