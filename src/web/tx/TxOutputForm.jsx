import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputField from '../components/InputField';
import B58InputField from '../components/B58InputField';

class TxOutputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index,
      address: props.address,
      amount: props.amount,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ [event.target.id]: event.target.value });
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
            value={address}
            handleChange={this.onInputChange}
          />
          <InputField
            label="Amount"
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

TxOutputForm.propTypes = {
  index: PropTypes.number.isRequired,
  address: PropTypes.string,
  amount: PropTypes.number,
};
TxOutputForm.defaultProps = {
  address: '',
  amount: 0,
};

export default TxOutputForm;
