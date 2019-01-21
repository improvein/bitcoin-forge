import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';
import TxInputForm from './TxInputForm';
import TxOutputForm from './TxOutputForm';
import TxInput from './TxInput';
import TxOutput from './TxOutput';

class CreateTxScreen extends Component {
  constructor() {
    super();
    this.state = {
      inputs: [],
      outputs: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.addInput = this.addInput.bind(this);
    this.addOutput = this.addOutput.bind(this);
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

  addOutput(event) {
    const { outputs } = this.state;
    const txOutput = new TxOutput(outputs.length);
    outputs.push(txOutput);
    this.setState({
      outputs,
    });
  }

  submit(event) {
    const { inputs, outputs } = this.state;
    console.log('Tx creation');
  }

  render() {
    const { inputs, outputs } = this.state;
    return (
      <div>
        <h1>Create Transaction</h1>
        <p>Create (forge) a transaction.</p>
        <form id="tx-form" className="row">
          <div className="col-sm">
            <h2>
              <div className="float-right">
                <Button
                  text={<FontAwesomeIcon icon="plus-circle" />}
                  btnClass="link"
                  onClick={this.addInput}
                  title="Add new input"
                />
              </div>
              Inputs
            </h2>
            {inputs.map(input => (
              <TxInputForm key={input.index} index={input.index} />
            ))}
          </div>
          <div className="col-sm-auto">
            <FontAwesomeIcon icon="arrow-right" className="align-middle" />
          </div>
          <div className="col-sm">
            <h2>
              <div className="float-right">
                <Button
                  text={<FontAwesomeIcon icon="plus-circle" />}
                  btnClass="link"
                  onClick={this.addOutput}
                  title="Add new output"
                />
              </div>
              Outputs
            </h2>
            {outputs.map(output => (
              <TxOutputForm key={output.index} index={output.index} />
            ))}
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
