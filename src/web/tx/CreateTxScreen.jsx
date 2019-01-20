import React, { Component } from 'react';
import Button from '../components/Button';
import TxInputForm from './TxInputForm';
import TxInput from './TxInput';

class CreateTxScreen extends Component {
  constructor() {
    super();
    this.state = {
      inputs: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.addInput = this.addInput.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  addInput(event) {
    const { inputs } = this.state;
    const txInput = new TxInput(inputs.length);
    inputs.push(txInput);
    this.setState({
      inputs,
    });
  }

  submit(event) {
    console.log('Tx creation');
  }

  render() {
    const { inputs } = this.state;
    return (
      <div>
        <h1>Create Transaction</h1>
        <p>Create (forge) a transaction.</p>
        <form id="tx-form" className="row">
          <div className="col-sm-6">
            <h2>
              <div className="float-right">
                <Button text="+" btnClass="secondary" onClick={this.addInput} />
              </div>
              Inputs
            </h2>
            {inputs.map(input => (
              <TxInputForm key={input.index} index={input.index} />
            ))}
          </div>
          <div className="col-sm-6">
            <h2>Outputs</h2>
          </div>
          <div className="col-sm-12">
            <Button text="Submit" btnClass="primary" onClick={this.submit} />
          </div>
        </form>
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Result - raw transaction</h5>
            <p className="card-text" id="tx-result">
              TEST RESTULT
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateTxScreen;
