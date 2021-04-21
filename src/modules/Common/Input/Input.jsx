import React from 'react';
import './Input.scss';

const Input = ({ value, onChange, showExtraText, extrasText, ...rest }) => {
  return (
    <div className="input-wrapper">
      <input value={value} onChange={onChange} className="input" {...rest} />
      {showExtraText && <span>{extrasText}</span>}
    </div>
  );
};

Input.defaultProps = {
  showExtraText: false,
  extrasText: '',
};

export default Input;
