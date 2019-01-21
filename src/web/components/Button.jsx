import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  text, id, btnClass, onClick, type, ...otherProps
}) => (
  <button type={type} className={`btn btn-${btnClass}`} id={id} onClick={onClick} {...otherProps}>
    {text}
  </button>
);

Button.propTypes = {
  id: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  btnClass: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
    'link',
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  id: null,
  type: 'button',
};

export default Button;
