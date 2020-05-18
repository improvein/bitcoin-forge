import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AmountInputField, AddressInputField, HexInputField } from '../components';
import { TxOutput } from '../../model';
import * as Constants from '../../model/Constants';

class TxOutputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.item.type,
      index: props.item.index,
      address: props.item.address,
      amount: props.item.amount,
      data: props.item.data,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    let fieldValue = event.target.value;
    if (event.target.type === 'checkbox') {
      fieldValue = event.target.checked;
    } else if (event.target.type === 'number') {
      fieldValue = parseInt(fieldValue, 10);
    }

    this.setState({ [event.target.id]: fieldValue }, () => {
      // get the properties and generate a TxInput object
      const { type, index, address, amount, data } = this.state;
      const txOutput = new TxOutput(type, parseInt(index, 10), address, parseInt(amount, 10), data);
      // fire the onUpdate event
      const { onUpdate } = this.props;
      onUpdate(txOutput);
    });
  }

  render() {
    const { type, index, address, amount, data } = this.state;

    return (
      <div className="card mb-1">
        <div className="card-header">{`Output #${index} ${type === Constants.TXOUTPUT_OPRETURN ? '[OP_RETURN]' : ''}`}</div>
        <div className="card-body">
          {type === Constants.TXOUTPUT_OPRETURN ? (
            <HexInputField label="Data" id="data" horizontal size="sm" value={data} handleChange={this.onInputChange} />
          ) : (
            <>
              <AddressInputField label="Address" id="address" horizontal size="sm" value={address} handleChange={this.onInputChange} />
              <AmountInputField label="Amount" id="amount" horizontal size="sm" value={amount} handleChange={this.onInputChange} />
            </>
          )}
        </div>
      </div>
    );
  }
}

TxOutputForm.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    address: PropTypes.string,
    amount: PropTypes.number,
    data: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func,
};
TxOutputForm.defaultProps = {
  onUpdate: () => {},
};

export default TxOutputForm;
