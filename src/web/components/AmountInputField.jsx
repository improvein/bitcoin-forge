import React from 'react';
import PropTypes from 'prop-types';
import AmountInput from './AmountInput';

const AmountInputField = ({
  label, id, value, handleChange, horizontal, size, ...otherProps
}) => {
  const inputToRender = (
    <AmountInput
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

AmountInputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.number,
  horizontal: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  handleChange: PropTypes.func,
};
AmountInputField.defaultProps = {
  value: '',
  horizontal: false,
  size: 'md',
  handleChange: () => {},
};

export default AmountInputField;
