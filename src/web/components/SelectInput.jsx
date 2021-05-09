import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.props.onChange(event);
  }

  render() {
    const { id, size, choices } = this.props;
    const { value } = this.state;

    return (
      <select
        className={`form-select form-select-${size}`}
        id={id}
        name={id}
        defaultValue={value}
        onChange={this.onInputChange}
      >
        {choices.map(choice => (
          <option value={choice.value} key={choice.value}>
            {choice.text}
          </option>
        ))}
      </select>
    );
  }
}

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  onChange: PropTypes.func,
};
SelectInput.defaultProps = {
  value: '',
  size: 'md',
  onChange: () => {},
};

export default SelectInput;
