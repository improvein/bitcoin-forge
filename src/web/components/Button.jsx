import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, text, id, btnClass, className, onClick, type, size, ...otherProps }) => (
  <button
    type={type}
    className={`btn btn-${btnClass} ${size !== null ? `btn-${size}` : ''} ${className}`}
    id={id}
    onClick={onClick}
    {...otherProps}>
    {text}
    {children}
  </button>
);

Button.propTypes = {
  id: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  btnClass: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']).isRequired,
  size: PropTypes.oneOf(['sm', 'lg']),
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  id: null,
  type: 'button',
  size: null,
  text: null,
};

export default Button;
