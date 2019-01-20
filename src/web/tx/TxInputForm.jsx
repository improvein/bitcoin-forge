import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputField from '../components/InputField';

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
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
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
          <InputField
            label="Prev TX Hash"
            type="text"
            id="prevTxHash"
            horizontal
            value={prevTxHash}
            handleChange={this.onInputChange}
          />
          <InputField
            label="Prev TX UTXO index"
            type="number"
            id="prevTxIndex"
            horizontal
            value={prevTxIndex}
            handleChange={this.onInputChange}
          />
          <InputField
            label="Private key"
            type="text"
            id="privateKey"
            horizontal
            value={privateKey}
            handleChange={this.onInputChange}
          />
          <InputField
            label="UTXO output"
            type="number"
            id="amount"
            horizontal
            value={amount}
            handleChange={this.onInputChange}
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
