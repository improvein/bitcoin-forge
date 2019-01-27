import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputField from '../components/InputField';
import B58InputField from '../components/B58InputField';
import TxOutput from './TxOutput';

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
    this.setState({ [event.target.id]: event.target.value }, () => {
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
        <div className="card-body">
          <h4 className="card-title">{`Output #${index}`}</h4>
          <B58InputField
            label="Address"
            id="address"
            horizontal
            size="sm"
            value={address}
            handleChange={this.onInputChange}
          />
          <InputField
            label="Amount"
            type="number"
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
