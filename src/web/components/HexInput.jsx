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
      });
      // call the outside handler
      this.props.onChange(event);
    } else {
      this.setState({
        errorMessage: 'The value is not hexadecimal',
      });
    }
  }

  render() {
    const { id, size } = this.props;
    const { value, errorMessage } = this.state;

    return (
      <div className={`input-group input-group-${size}`}>
        <div className="input-group-prepend">
          <span className="input-group-text">0x</span>
        </div>
        <input
          type="text"
          className={`form-control ${errorMessage !== '' ? 'has-error' : ''}`}
          id={id}
          value={value}
          onChange={this.onInputChange}
        />
      </div>
    );
  }
}

HexInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onChange: PropTypes.func,
};
HexInput.defaultProps = {
  value: '',
  size: 'md',
  onChange: () => {},
};

export default HexInput;
