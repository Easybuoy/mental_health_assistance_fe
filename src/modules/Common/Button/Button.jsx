import React from 'react';
import './Button.scss';

const Button = ({ onClick, ...rest }) => {
  return <button className="btn" onClick={onClick} {...rest} />;
};

export default Button;
