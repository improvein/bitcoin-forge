import React from 'react';
import PropTypes from 'prop-types';
import AddressInput from './AddressInput';

const AddressInputField = ({
  label, id, value, handleChange, horizontal, size, ...otherProps
}) => {
  const inputToRender = (
    <AddressInput
      className="form-control"
      id={id}
      value={value}
      size={size}
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

AddressInputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  horizontal: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  handleChange: PropTypes.func,
};
AddressInputField.defaultProps = {
  value: '',
  horizontal: false,
  size: 'md',
  handleChange: () => {},
};

export default AddressInputField;
