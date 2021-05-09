import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AmountInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      errorMessage: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const { value } = event.target;
    // validate if numeric
    if (/^[0-9]*$/g.test(value)) {
      this.setState({
        errorMessage: '',
        value: parseInt(value, 10),
      });
      // call the outside handler
      this.props.onChange(event);
    } else {
      this.setState({
        errorMessage: 'The value is not numerical',
      });
    }
  }

  render() {
    const { id, size, unit } = this.props;
    const { value, errorMessage } = this.state;

    return (
      <div className={`input-group input-group-${size}`}>
        <input
          type="number"
          className={`form-control ${errorMessage !== '' ? 'is-invalid' : ''}`}
          id={id}
          value={value}
          pattern="[0-9]*"
          onChange={this.onInputChange}
        />
        <span className="input-group-text">{unit}</span>
        {errorMessage !== '' && <div className="invalid-feedback">{errorMessage}</div>}
      </div>
    );
  }
}

AmountInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  unit: PropTypes.string,
  onChange: PropTypes.func,
};
AmountInput.defaultProps = {
  value: '',
  size: 'md',
  unit: 'sat',
  onChange: () => {},
};

export default AmountInput;
