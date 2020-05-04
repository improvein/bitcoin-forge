import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HexInput extends Component {
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
    // validate if Hexa
    if (/^[0-9a-fA-F]*$/g.test(value)) {
      this.setState({
        value: value.toLowerCase(),
        errorMessage: '',
      });
    } else {
      this.setState({
        value: value.toLowerCase(),
        errorMessage: 'The value is not hexadecimal',
      });
    }
    // call the outside handler
    this.props.onChange(event);
  }

  render() {
    const { id, size, value: valueProps, readOnly } = this.props;
    const { value, errorMessage } = this.state;

    return (
      <div className={`input-group input-group-${size}`}>
        <div className="input-group-prepend" title="Hexadecimal">
          <span className="input-group-text">0x</span>
        </div>
        <input
          type="text"
          className={`text-console form-control ${errorMessage !== '' ? 'is-invalid' : ''}`}
          id={id}
          value={valueProps ? valueProps : value}
          readOnly={readOnly}
          onChange={this.onInputChange}
        />
        {errorMessage !== '' && <div className="invalid-feedback">{errorMessage}</div>}
      </div>
    );
  }
}

HexInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};
HexInput.defaultProps = {
  value: '',
  size: 'md',
  readOnly: false,
  onChange: () => {},
};

export default HexInput;
