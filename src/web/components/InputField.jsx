import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  label, type, id, value, handleChange, horizontal, ...otherProps
}) => {
  const inputToRender = (
    <input
      type={type}
      className="form-control"
      id={id}
      value={value}
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

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  horizontal: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};
InputField.defaultProps = {
  value: '',
  horizontal: false,
};

export default InputField;
