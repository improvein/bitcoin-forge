import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  text, id, btnClass, onClick,
}) => (
  <button type="button" className={`btn btn-${btnClass}`} id={id} onClick={onClick}>
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string,
  btnClass: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  id: null,
};

export default Button;
