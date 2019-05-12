import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, SelectNetworkField } from '../components';
import addressService from '../../service/address';

class CreateMultisigP2SH extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTestnet: props.isTestnet,
      publicKeys: props.publicKeys,
      requiredSigs: props.requiredSigs,
      address: '',
      errorMessage: '',
    };
    this.onNetworkChange = this.onNetworkChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Init
    addressService.setTestnet(true);
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
    const { publicKeys, requiredSigs } = this.state;

    try {
      const publicKeysArr = publicKeys.split(/\s+/);
      const address = addressService.createMultisigP2SH(publicKeysArr, requiredSigs);

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
      isTestnet, publicKeys, requiredSigs, address, errorMessage,
    } = this.state;

    return (
      <div className="">
        <SelectNetworkField
          id="multisig-p2sh-network"
          isTestnet={isTestnet}
          onChange={this.onNetworkChange}
        />
        <div className="form-group">
          <label htmlFor="publicKeys">Public keys (one per line)</label>
          <textarea
            id="publicKeys"
            name="publicKeys"
            className="form-control"
            rows="6"
            value={publicKeys}
            onChange={this.onInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="requiredSigs">Required signatures</label>
          <input
            type="number"
            id="requiredSigs"
            name="requiredSigs"
            className="form-control"
            value={requiredSigs}
            onChange={this.onInputChange}
          />
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

CreateMultisigP2SH.propTypes = {
  isTestnet: PropTypes.bool,
  publicKeys: PropTypes.arrayOf(PropTypes.string),
  requiredSigs: PropTypes.number,
  onCreate: PropTypes.func,
};
CreateMultisigP2SH.defaultProps = {
  isTestnet: true,
  publicKeys: [],
  requiredSigs: 1,
  onCreate: () => {},
};

export default CreateMultisigP2SH;
