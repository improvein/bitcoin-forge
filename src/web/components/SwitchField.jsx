import React from 'react';
import PropTypes from 'prop-types';

const SwitchField = ({
  label, id, value, handleChange, ...otherProps
}) => (
  <div className="form-group">
    <div className="custom-control custom-switch">
      <input
        type="checkbox"
        className="custom-control-input"
        id={id}
        checked={value}
        onChange={handleChange}
        {...otherProps}
      />
      <label htmlFor={id} className="custom-control-label">
        {label}
      </label>
    </div>
  </div>
);

SwitchField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.bool,
  handleChange: PropTypes.func,
};
SwitchField.defaultProps = {
  value: false,
  handleChange: () => {},
};

export default SwitchField;
