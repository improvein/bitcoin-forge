import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HexInputField, Button, SelectNetworkField } from '../components';
import addressService from '../../service/address';

class CreateP2PKH extends Component {
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
  }

  onNetworkChange(isTestnet) {
    addressService.setTestnet(isTestnet);
    this.setState({ isTestnet });
  }

  onInputChange(event) {
    let fieldValue = event.target.value;
    if (event.target.type === 'checkbox') {
      fieldValue = event.target.checked;
    } else if (event.target.type === 'number') {
      fieldValue = parseInt(fieldValue, 10);
    }

    // update state property
    this.setState({ [event.target.id]: fieldValue });
  }

  onSubmit(event) {
    const { publicKey } = this.state;

    try {
      const address = addressService.createP2PKH(publicKey);

      this.setState({ address }, () => {
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
        <SelectNetworkField id="network" isTestnet={isTestnet} onChange={this.onNetworkChange} />
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
          <p className="form-control-plaintext">{address}</p>
        </div>
      </div>
    );
  }
}

CreateP2PKH.propTypes = {
  isTestnet: PropTypes.bool,
  publicKey: PropTypes.string,
  onCreate: PropTypes.func,
};
CreateP2PKH.defaultProps = {
  isTestnet: true,
  publicKey: '',
  onCreate: () => {},
};

export default CreateP2PKH;
