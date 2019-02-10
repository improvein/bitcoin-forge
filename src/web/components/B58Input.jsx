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
      });
      // call the outside handler
      this.props.onChange(event);
    } else {
      this.setState({
        errorMessage: 'The value is not base58',
      });
    }
  }

  render() {
    const { id, size } = this.props;
    const { value, errorMessage } = this.state;

    return (
      <div className={`input-group input-group-${size}`}>
        <div className="input-group-prepend" title="Base58">
          <span className="input-group-text">b58</span>
        </div>
        <input
          type="text"
          className={`text-console form-control ${errorMessage !== '' ? 'has-error' : ''}`}
          id={id}
          value={value}
          onChange={this.onInputChange}
        />
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
