import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  label, type, id, value, handleChange, horizontal, size, ...otherProps
}) => {
  const inputToRender = (
    <input
      type={type}
      className={`form-control form-control-${size}`}
      id={id}
      value={value}
      onChange={handleChange}
      {...otherProps}
    />
  );

  return (
    <div className={`form-group${horizontal ? ' row' : ''} mb-3`}>
      <label htmlFor={id} className={`${horizontal ? 'col-sm-3 col-form-label' : ''}`}>
        {label}
      </label>
      {horizontal ? <div className="col-sm-9">{inputToRender}</div> : inputToRender}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  horizontal: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  handleChange: PropTypes.func,
};
InputField.defaultProps = {
  value: '',
  size: 'md',
  horizontal: false,
  handleChange: () => {},
};

export default InputField;
