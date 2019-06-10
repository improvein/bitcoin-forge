import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { HexInputField, Button, SelectNetworkField } from '../components';
import addressService from '../../service/address';

class CreateP2WPKH extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTestnet: props.isTestnet,
      publicKey: props.publicKey,
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
    const { publicKey } = this.state;

    try {
      const address = addressService.createP2WPKH(publicKey);

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
      isTestnet, publicKey, address, errorMessage,
    } = this.state;

    return (
      <div className="">
        <SelectNetworkField
          id="p2wpkh-network"
          isTestnet={isTestnet}
          onChange={this.onNetworkChange}
        />
        <HexInputField
          label="Public key"
          id="publicKey"
          value={publicKey}
          handleChange={this.onInputChange}
        />
        <Button text="Generate address" btnClass="primary" onClick={this.onSubmit} />
        <hr />
        <p className="text-danger">{errorMessage}</p>
        <div className="form-group">
          <label>Address</label>
          <p className="text-console form-control-plaintext">{address}</p>
          {address !== '' && <QRCode value={address} size={192} />}
        </div>
      </div>
    );
  }
}

CreateP2WPKH.propTypes = {
  isTestnet: PropTypes.bool,
  publicKey: PropTypes.string,
  onCreate: PropTypes.func,
};
CreateP2WPKH.defaultProps = {
  isTestnet: true,
  publicKey: '',
  onCreate: () => {},
};

export default CreateP2WPKH;
