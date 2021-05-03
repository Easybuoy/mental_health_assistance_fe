import dotenv from 'dotenv';

dotenv.config();

const { REACT_APP_API_BASE_URI } = process.env;

const configVariables = {
  API_BASE_URI: REACT_APP_API_BASE_URI,
};

export default configVariables;
