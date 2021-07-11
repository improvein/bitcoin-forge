import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputField from '../components/InputField';
import { AmountInputField, HexInputField, B58InputField, ButtonExpandable, SelectInputField } from '../components';
import { TxInput } from '../../model';
import * as Constants from '../../model/Constants';

class TxInputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: parseInt(props.item.index, 10),
      prevTxHash: props.item.prevTxHash,
      prevTxIndex: parseInt(props.item.prevTxIndex, 10),
      privateKey: props.item.privateKey,
      redeemScript: props.item.redeemScript,
      amount: parseInt(props.item.amount, 10),
      type: props.item.type,
      collapsed: false,
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onExpandCollapse = this.onExpandCollapse.bind(this);
  }

  onFieldChange(event) {
    let fieldValue = event.target.value;
    if (event.target.type === 'checkbox') {
      fieldValue = event.target.checked;
    } else if (event.target.type === 'number') {
      fieldValue = parseInt(fieldValue, 10);
    }

    const stateProp = event.target.id.split('_')[0];

    this.setState({ [stateProp]: fieldValue }, () => {
      // get the properties and generate a TxInput object
      const { index, prevTxHash, prevTxIndex, privateKey, redeemScript, amount, type } = this.state;
      const txInput = new TxInput({
        index: index,
        prevTxHash,
        prevTxIndex: prevTxIndex,
        privateKey,
        redeemScript,
        amount: amount,
        type,
      });
      // fire the onUpdate event
      const { onUpdate } = this.props;
      onUpdate(txInput);
    });
  }

  onRemoveClick(event) {
    if (confirm('Are you sure you want to remove this Input?')) {
      const { index } = this.state;

      // fire the onUpdate event
      const { onRemove } = this.props;
      if (onRemove) {
        onRemove(index);
      }
    }
  }

  onExpandCollapse(event) {
    event.preventDefault();
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  }

  render() {
    const { index, prevTxHash, prevTxIndex, privateKey, redeemScript, amount, type, collapsed } = this.state;

    const availableInputTypes = Constants.AddressTypes.filter((addrType) =>
      [Constants.ADDRTYPE_P2PKH, Constants.ADDRTYPE_P2SH, Constants.ADDRTYPE_P2WPKH, Constants.ADDRTYPE_P2SH_P2WPKH].includes(addrType),
    );

    return (
      <div className="card mb-1">
        <div className="card-header">
          <ButtonExpandable
            btnClass="danger"
            size="sm"
            className="float-end"
            text="Remove"
            align="right"
            icon="trash"
            onClick={this.onRemoveClick}
          />
          <button type="button" className="btn btn-link" onClick={this.onExpandCollapse}>
            <FontAwesomeIcon icon={collapsed ? 'caret-right' : 'caret-down'} className="fa-fw" />
            {`Input #${index}`}
          </button>
        </div>
        {!collapsed && 
          <div className="card-body">
            <div>
              <h4 className="card-title">Previous UTXO</h4>
              <HexInputField
                label="TX Hash"
                id={`prevTxHash_${index}`}
                horizontal
                size="sm"
                value={prevTxHash}
                handleChange={this.onFieldChange}
              />
              <InputField
                label="Index"
                type="number"
                pattern="[0-9]*"
                id={`prevTxIndex_${index}`}
                horizontal
                size="sm"
                value={prevTxIndex}
                handleChange={this.onFieldChange}
              />
              <SelectInputField
                label="Type"
                id={`type_${index}`}
                size="sm"
                horizontal
                value={type}
                choices={availableInputTypes.map((addrType) => ({
                  text: addrType,
                  value: addrType,
                }))}
                handleChange={this.onFieldChange}
              />
              <AmountInputField label="Amount" id={`amount_${index}`} horizontal size="sm" value={amount} handleChange={this.onFieldChange} />
            </div>
            <hr />
            {type === Constants.ADDRTYPE_P2SH || type === Constants.ADDRTYPE_P2WSH  && (
              <HexInputField
                label="Redeem script"
                id={`redeemScript_${index}`}
                horizontal
                size="sm"
                value={redeemScript}
                helpMessage="Script: [your solution] + [Lock script in Hexa]"
                handleChange={this.onFieldChange}
              />
            )}

            {(type === Constants.ADDRTYPE_P2PKH || type === Constants.ADDRTYPE_P2WPKH || type === Constants.ADDRTYPE_P2SH_P2WPKH) && (
              <B58InputField
                label="Private key"
                id={`privateKey_${index}`}
                horizontal
                size="sm"
                value={privateKey}
                handleChange={this.onFieldChange}
              />
            )}
          </div>
        }
      </div>
    );
  }
}

TxInputForm.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    prevTxHash: PropTypes.string.isRequired,
    prevTxIndex: PropTypes.number.isRequired,
    privateKey: PropTypes.string,
    redeemScript: PropTypes.string,
    amount: PropTypes.number,
    type: PropTypes.oneOf(Constants.AddressTypes),
  }).isRequired,
  onUpdate: PropTypes.func,
  onRemove: PropTypes.func,
};
TxInputForm.defaultProps = {
  onUpdate: () => {},
  onRemove: () => {},
};

export default TxInputForm;
