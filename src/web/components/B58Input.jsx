import React, { Component } from 'react';
import PropTypes from 'prop-types';

class B58Input extends Component {
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
    if (/^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]*$/g.test(value)) {
      this.setState({
        value,
        errorMessage: '',
      });
    } else {
      this.setState({
        value,
        errorMessage: 'The value is not base58',
      });
    }
    // call the outside handler
    this.props.onChange(event);
  }

  render() {
    const { id, size } = this.props;
    const { value, errorMessage } = this.state;

    return (
      <div className={`input-group input-group-${size}`}>
        <span className="input-group-text" title="Base58">b58</span>
        <input
          type="text"
          className={`text-console form-control ${errorMessage !== '' ? 'is-invalid' : ''}`}
          id={id}
          value={value}
          onChange={this.onInputChange}
        />
        {errorMessage !== '' && <div className="invalid-feedback">{errorMessage}</div>}
      </div>
    );
  }
}

B58Input.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onChange: PropTypes.func,
};
B58Input.defaultProps = {
  value: '',
  size: 'md',
  onChange: () => {},
};

export default B58Input;
