import configVariables from "../config/env";

const convertToCurrency = (price) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: configVariables.CURRENCY,
  });

  return formatter.format(price);
};
export default convertToCurrency;
