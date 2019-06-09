import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddressInput extends Component {
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
    // validate if base58 or bech32
    if (
      /^[1-3,5,m][123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/g.test(value)
      || /^(bc|tb)([0-9]|1[0-6])[23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz]+$/g.test(
        value,
      )
    ) {
      this.setState({
        value,
        errorMessage: '',
      });
    } else {
      this.setState({
        value,
        errorMessage: 'The value is not a valid address format',
      });
    }

    // call the outside handler
    this.props.onChange(event);
  }

  render() {
    const { id, size } = this.props;
    const { value, errorMessage } = this.state;

    return (
      <>
        <div className={`input-group input-group-${size}`}>
          <div className="input-group-prepend" title="Bitcoin Address">
            <span className="input-group-text">Addr</span>
          </div>
          <input
            type="text"
            className={`text-console form-control ${errorMessage !== '' ? 'is-invalid' : ''}`}
            id={id}
            value={value}
            onChange={this.onInputChange}
          />
          {errorMessage !== '' && <div className="invalid-feedback">{errorMessage}</div>}
        </div>
      </>
    );
  }
}

AddressInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onChange: PropTypes.func,
};
AddressInput.defaultProps = {
  value: '',
  size: 'md',
  onChange: () => {},
};

export default AddressInput;
