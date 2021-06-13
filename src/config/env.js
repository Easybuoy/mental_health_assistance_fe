import dotenv from 'dotenv';

dotenv.config();

const {
  REACT_APP_API_BASE_URI,
  REACT_APP_PAYSTACK_API_KEY,
  REACT_APP_THERAPIST_PRICE,
  REACT_APP_CURRENCY,
} = process.env;

const configVariables = {
  API_BASE_URI: REACT_APP_API_BASE_URI,
  PAYSTACK_API_KEY: REACT_APP_PAYSTACK_API_KEY,
  THERAPIST_PRICE: REACT_APP_THERAPIST_PRICE,
  CURRENCY: REACT_APP_CURRENCY,
};

export default configVariables;
