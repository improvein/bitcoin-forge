import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputField from '../components/InputField';
import HexInputField from '../components/HexInputField';
import B58InputField from '../components/B58InputField';

class TxInputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index,
      prevTxHash: props.prevTxHash,
      prevTxIndex: props.prevTxIndex,
      privateKey: props.privateKey,
      amount: props.amount,
    };
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const {
      index, prevTxHash, prevTxIndex, privateKey, amount,
    } = this.state;

    return (
      <div className="card mb-1">
        <div className="card-body">
          <h4 className="card-title">{`Input #${index}`}</h4>
          <HexInputField
            label="Prev TX Hash"
            id="prevTxHash"
            horizontal
            value={prevTxHash}
            handleChange={this.onFieldChange}
          />
          <InputField
            label="Prev TX UTXO index"
            type="number"
            id="prevTxIndex"
            horizontal
            value={prevTxIndex}
            handleChange={this.onFieldChange}
          />
          <B58InputField
            label="Private key"
            id="privateKey"
            horizontal
            value={privateKey}
            handleChange={this.onFieldChange}
          />
          <InputField
            label="UTXO amount"
            type="number"
            id="amount"
            horizontal
            value={amount}
            handleChange={this.onFieldChange}
          />
        </div>
      </div>
    );
  }
}

TxInputForm.propTypes = {
  index: PropTypes.number.isRequired,
  prevTxHash: PropTypes.string,
  prevTxIndex: PropTypes.number,
  privateKey: PropTypes.string,
  amount: PropTypes.number,
};
TxInputForm.defaultProps = {
  prevTxHash: '',
  prevTxIndex: 0,
  privateKey: '',
  amount: 0,
};

export default TxInputForm;