import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectNetworkField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTestnet: props.isTestnet,
    };
    this.onNetworkChange = this.onNetworkChange.bind(this);
  }

  onNetworkChange(event) {
    const network = event.target.value;
    const isTestnet = network === 'testnet';

    this.setState(
      {
        isTestnet,
      },
      () => {
        const { onChange } = this.props;
        onChange(isTestnet);
      },
    );
  }

  render() {
    const { id } = this.props;
    const { isTestnet } = this.state;

    return (
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">Network</label>
        <div className="col-sm-9">
          <div className="custom-control custom-radio custom-control-inline my-2">
            <input
              type="radio"
              id={`${id}-testnet`}
              name={`${id}`}
              className="custom-control-input"
              value="testnet"
              checked={isTestnet}
              onChange={this.onNetworkChange}
            />
            <label className="custom-control-label" htmlFor={`${id}-testnet`}>
              Testnet
            </label>
          </div>
          <div className="custom-control custom-radio custom-control-inline">
            <input
              type="radio"
              id={`${id}-mainnet`}
              name={`${id}`}
              className="custom-control-input"
              value="mainnet"
              checked={!isTestnet}
              onChange={this.onNetworkChange}
            />
            <label className="custom-control-label" htmlFor={`${id}-mainnet`}>
              Mainnet
            </label>
          </div>
        </div>
      </div>
    );
  }
}

SelectNetworkField.propTypes = {
  id: PropTypes.string.isRequired,
  isTestnet: PropTypes.bool,
  onChange: PropTypes.func,
};
SelectNetworkField.defaultProps = {
  isTestnet: true,
  onChange: () => {},
};

export default SelectNetworkField;
