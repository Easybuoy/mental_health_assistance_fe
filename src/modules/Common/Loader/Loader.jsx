import React from 'react';
import { SpinnerCircular } from 'spinners-react';

import COLORS from '../../../config/constants/colors';

const Loader = () => {
  return (
    <SpinnerCircular
      size={15}
      thickness={200}
      speed={100}
      color={COLORS.BRAND_PRIMARY}
      secondaryColor={COLORS.WHITE}
    />
  );
};

export default Loader;
