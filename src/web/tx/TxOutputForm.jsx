import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AmountInputField, AddressInputField, ButtonExpandable, HexInputField } from '../components';
import { TxOutput } from '../../model';
import * as Constants from '../../model/Constants';

class TxOutputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.item.type,
      index: parseInt(props.item.index, 10),
      address: props.item.address,
      amount: parseInt(props.item.amount, 10),
      data: props.item.data,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
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
      const txOutput = new TxOutput(type, index, address, amount, data);
      // fire the onUpdate event
      const { onUpdate } = this.props;
      onUpdate(txOutput);
    });
  }

  onRemoveClick(event) {
    if (confirm('Are you sure you want to remove this Output?')) {
      const { index } = this.state;

      // fire the onUpdate event
      const { onRemove } = this.props;
      if (onRemove) {
        onRemove(index);
      }
    }
  }

  render() {
    const { type, index, address, amount, data } = this.state;

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
          {`Output #${index} ${type === Constants.TXOUTPUT_OPRETURN ? '[OP_RETURN]' : ''}`}
        </div>
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
  onRemove: PropTypes.func,
};
TxOutputForm.defaultProps = {
  onUpdate: () => {},
  onRemove: () => {},
};

export default TxOutputForm;
