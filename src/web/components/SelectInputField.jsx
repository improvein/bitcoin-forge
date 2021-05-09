import React from 'react';
import PropTypes from 'prop-types';
import SelectInput from './SelectInput';

const SelectInputField = ({
  label,
  id,
  value,
  choices,
  handleChange,
  horizontal,
  size,
  ...otherProps
}) => {
  const inputToRender = (
    <SelectInput
      id={id}
      size={size}
      value={value}
      choices={choices}
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

SelectInputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  horizontal: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  handleChange: PropTypes.func,
};
SelectInputField.defaultProps = {
  value: '',
  size: 'md',
  horizontal: false,
  handleChange: () => {},
};

export default SelectInputField;
