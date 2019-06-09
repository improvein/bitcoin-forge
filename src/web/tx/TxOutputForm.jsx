import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AmountInputField, AddressInputField } from '../components';
import { TxOutput } from '../../model';

class TxOutputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.item.index,
      address: props.item.address,
      amount: props.item.amount,
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
      const { index, address, amount } = this.state;
      const txOutput = new TxOutput(parseInt(index, 10), address, parseInt(amount, 10));
      // fire the onUpdate event
      const { onUpdate } = this.props;
      onUpdate(txOutput);
    });
  }

  render() {
    const { index, address, amount } = this.state;

    return (
      <div className="card mb-1">
        <div className="card-header">{`Output #${index}`}</div>
        <div className="card-body">
          <AddressInputField
            label="Address"
            id="address"
            horizontal
            size="sm"
            value={address}
            handleChange={this.onInputChange}
          />
          <AmountInputField
            label="Amount"
            id="amount"
            horizontal
            size="sm"
            value={amount}
            handleChange={this.onInputChange}
          />
        </div>
      </div>
    );
  }
}

TxOutputForm.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    address: PropTypes.string,
    amount: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func,
};
TxOutputForm.defaultProps = {
  onUpdate: () => {},
};

export default TxOutputForm;
