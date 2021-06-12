import configVariables from '../config/env';

const config = (userId, email) => {
  return {
    reference: `${userId}${new Date().getTime()}`,
    email,
    amount: Number(configVariables.THERAPIST_PRICE) * 100,
    publicKey: configVariables.PAYSTACK_API_KEY,
  };
};

export default config;
