import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HexInputField, Button, SelectNetworkField } from '../components';
import addressService from '../../service/address';

class CreateP2WSH extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTestnet: props.isTestnet,
      redeemScript: props.redeemScript,
      address: '',
      errorMessage: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onNetworkChange = this.onNetworkChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Init
    addressService.setTestnet(true);
  }

  onNetworkChange(isTestnet) {
    addressService.setTestnet(isTestnet);
    this.setState({ isTestnet });
  }

  onInputChange(event) {
    const fieldValue = event.target.value;

    // update state property
    this.setState({ [event.target.id]: fieldValue });
  }

  onSubmit(event) {
    const { redeemScript } = this.state;

    try {
      const address = addressService.createP2WSH(redeemScript);

      this.setState({ address, errorMessage: '' }, () => {
        // fire the onUpdate event
        const { onCreate } = this.props;
        onCreate(address);
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  }

  render() {
    const {
      isTestnet, redeemScript, address, errorMessage,
    } = this.state;

    return (
      <div className="">
        <SelectNetworkField
          id="p2wsh-network"
          isTestnet={isTestnet}
          onChange={this.onNetworkChange}
        />
        <HexInputField
          label="Redeem script (hex)"
          id="redeemScript"
          value={redeemScript}
          handleChange={this.onInputChange}
        />
        <div className="mb-3">
          <small>
            You can forge this sript
            {' '}
            <Link to="/script/create">here</Link>
          </small>
        </div>
        <Button text="Generate address" btnClass="primary" onClick={this.onSubmit} />
        <hr />
        <p className="text-danger">{errorMessage}</p>
        <div className="form-group">
          <label>Address</label>
          <p className="text-console form-control-plaintext">{address}</p>
        </div>
      </div>
    );
  }
}

CreateP2WSH.propTypes = {
  isTestnet: PropTypes.bool,
  redeemScript: PropTypes.string,
  onCreate: PropTypes.func,
};
CreateP2WSH.defaultProps = {
  isTestnet: true,
  redeemScript: '',
  onCreate: () => {},
};

export default CreateP2WSH;
