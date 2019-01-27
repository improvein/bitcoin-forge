import React from 'react';
import PropTypes from 'prop-types';
import HexInput from './HexInput';

const HexInputField = ({
  label, id, value, handleChange, horizontal, size, ...otherProps
}) => {
  const inputToRender = (
    <HexInput
      className="form-control"
      id={id}
      value={value}
      size={size}
      onChange={handleChange}
      {...otherProps}
    />
  );

  return (
    <div className={`form-group${horizontal ? ' row' : ''}`}>
      <label htmlFor={id} className={`${horizontal ? 'col-sm-3 col-form-label' : ''}`}>
        {label}
      </label>
      {horizontal ? <div className="col-sm-9">{inputToRender}</div> : inputToRender}
    </div>
  );
};

HexInputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  horizontal: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  handleChange: PropTypes.func,
};
HexInputField.defaultProps = {
  value: '',
  horizontal: false,
  size: 'md',
  handleChange: () => {},
};

export default HexInputField;
