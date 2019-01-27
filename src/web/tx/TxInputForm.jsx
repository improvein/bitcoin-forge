import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputField from '../components/InputField';
import HexInputField from '../components/HexInputField';
import B58InputField from '../components/B58InputField';
import TxInput from './TxInput';

class TxInputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.item.index,
      prevTxHash: props.item.prevTxHash,
      prevTxIndex: props.item.prevTxIndex,
      privateKey: props.item.privateKey,
      amount: props.item.amount,
    };
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange(event) {
    this.setState({ [event.target.id]: event.target.value }, () => {
      // get the properties and generate a TxInput object
      const {
        index, prevTxHash, prevTxIndex, privateKey, amount,
      } = this.state;
      const txInput = new TxInput(
        parseInt(index, 10),
        prevTxHash,
        parseInt(prevTxIndex, 10),
        privateKey,
        parseInt(amount, 10),
      );
      // fire the onUpdate event
      const { onUpdate } = this.props;
      onUpdate(txInput);
    });
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
            size="sm"
            value={prevTxHash}
            handleChange={this.onFieldChange}
          />
          <InputField
            label="Prev TX UTXO index"
            type="number"
            id="prevTxIndex"
            horizontal
            size="sm"
            value={prevTxIndex}
            handleChange={this.onFieldChange}
          />
          <B58InputField
            label="Private key"
            id="privateKey"
            horizontal
            size="sm"
            value={privateKey}
            handleChange={this.onFieldChange}
          />
          <InputField
            label="UTXO amount"
            type="number"
            id="amount"
            horizontal
            size="sm"
            value={amount}
            handleChange={this.onFieldChange}
          />
        </div>
      </div>
    );
  }
}

TxInputForm.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    prevTxHash: PropTypes.string,
    prevTxIndex: PropTypes.number,
    privateKey: PropTypes.string,
    amount: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func,
};
TxInputForm.defaultProps = {
  onUpdate: () => {},
};

export default TxInputForm;
