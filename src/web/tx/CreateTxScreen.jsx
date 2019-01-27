import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import txService from '../../service/tx';

import Button from '../components/Button';
import TxInputForm from './TxInputForm';
import TxOutputForm from './TxOutputForm';
import TxInput from './TxInput';
import TxOutput from './TxOutput';
import ButtonRadio from '../components/ButtonRadio';

class CreateTxScreen extends Component {
  constructor() {
    super();
    this.state = {
      isTestnet: true,
      inputs: [],
      outputs: [],
      tx: null,
      errorMessage: '',
    };

    txService.setTestnet(true);

    this.onNetworkChange = this.onNetworkChange.bind(this);
    this.onAddInput = this.onAddInput.bind(this);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.onAddOutput = this.onAddOutput.bind(this);
    this.onUpdateOutput = this.onUpdateOutput.bind(this);
    this.submit = this.submit.bind(this);
  }

  onNetworkChange(event) {
    const network = event.target.value;
    const isTestnet = network === 'testnet';

    txService.setTestnet(isTestnet);
    this.setState({
      isTestnet,
    });
  }

  onAddInput(event) {
    const { inputs } = this.state;
    // get the last index used
    let lastIndex = 0;
    if (inputs.length > 0) {
      lastIndex = inputs.reduce(
        (acc, currentValue) => (currentValue >= acc.index ? currentValue : acc.index),
        inputs[0],
      );
    }

    const txInput = new TxInput(lastIndex + 1);
    inputs.push(txInput);

    this.setState({
      inputs,
    });
  }

  onUpdateInput(txInput) {
    const { inputs } = this.state;
    // find the input to update
    const arrayPos = inputs.findIndex(input => input.index === txInput.index);
    // now replace the old TxInput with the new one
    inputs.splice(arrayPos, 1, txInput);

    this.setState({
      inputs,
    });
  }

  onAddOutput() {
    const { outputs } = this.state;
    // get the last index used
    let lastIndex = 0;
    if (outputs.length > 0) {
      lastIndex = outputs.reduce(
        (acc, currentValue) => (currentValue >= acc.index ? currentValue : acc.index),
        outputs[0],
      );
    }

    const txOutput = new TxOutput(lastIndex + 1);
    outputs.push(txOutput);

    this.setState({
      outputs,
    });
  }

  onUpdateOutput(txOutput) {
    const { outputs } = this.state;
    // find the input to update
    const arrayPos = outputs.findIndex(output => output.index === txOutput.index);
    // now replace the old TxInput with the new one
    outputs.splice(arrayPos, 1, txOutput);

    this.setState({
      outputs,
    });
  }

  submit() {
    const { inputs, outputs } = this.state;

    try {
      const tx = txService.createTx(inputs, outputs);
      this.setState({
        tx,
        errorMessage: '',
      });
    } catch (err) {
      console.error('Creating tx: ', err);
      this.setState({
        errorMessage: err.message,
      });
    }
  }

  render() {
    const {
      isTestnet, inputs, outputs, tx, errorMessage,
    } = this.state;
    // calculate the estimated fee
    let estimatedFee = 0;
    inputs.forEach((input) => {
      estimatedFee += input.amount;
    });
    outputs.forEach((output) => {
      estimatedFee -= output.amount;
    });

    const networkChoices = [
      { text: 'Mainnet', value: 'mainnet' },
      { text: 'Testnet', value: 'testnet' },
    ];
    const currentNetwork = isTestnet ? 'testnet' : 'mainnet';

    return (
      <div>
        <h1>Create Transaction</h1>
        <p>Create (forge) a transaction.</p>
        <form id="tx-form" className="row">
          <div className="col-12">
            <label className="mr-2">Network</label>
            <ButtonRadio
              id="network"
              btnClass="light"
              value={currentNetwork}
              choices={networkChoices}
              onChange={this.onNetworkChange}
            />
          </div>
          <div className="col-sm">
            <h2>
              <div className="float-right">
                <Button
                  text={<FontAwesomeIcon icon="plus-circle" />}
                  btnClass="link"
                  onClick={this.onAddInput}
                  title="Add new input"
                />
              </div>
              Inputs
            </h2>
            {inputs.map(input => (
              <TxInputForm key={input.index} item={input} onUpdate={this.onUpdateInput} />
            ))}
          </div>
          <div className="col-sm-auto d-flex align-items-center">
            <FontAwesomeIcon icon="arrow-right" />
          </div>
          <div className="col-sm">
            <h2>
              <div className="float-right">
                <Button
                  text={<FontAwesomeIcon icon="plus-circle" />}
                  btnClass="link"
                  onClick={this.onAddOutput}
                  title="Add new output"
                />
              </div>
              Outputs
            </h2>
            {outputs.map(output => (
              <TxOutputForm key={output.index} item={output} onUpdate={this.onUpdateOutput} />
            ))}
            <div className="card bg-light mb-1">
              <div className="card-body">
                <h4 className="card-title">Estimated fee</h4>
                <p className="card-subtitle mb-2 text-muted">Calculated based on entered amounts</p>
                <p className="card-text text-right">{`${estimatedFee} sat`}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <Button text="Submit" btnClass="primary" onClick={this.submit} />
          </div>
        </form>
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Result</h5>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {tx && (
              <div className="tx-result">
                <dl className="row">
                  <dt className="col-sm-3">ID</dt>
                  <dd className="col-sm-9">{tx.getId()}</dd>

                  <dt className="col-sm-3">Size</dt>
                  <dd className="col-sm-9">{`${tx.byteLength()} bytes`}</dd>

                  <dt className="col-sm-3">Virtual size</dt>
                  <dd className="col-sm-9">{`${tx.virtualSize()} bytes`}</dd>

                  <dt className="col-sm-3">Weight</dt>
                  <dd className="col-sm-9">{`${tx.weight()} bytes`}</dd>

                  <dt className="col-sm-3">Miner fee</dt>
                  <dd className="col-sm-9">
                    {`${estimatedFee} sat (${Math.round(
                      estimatedFee / tx.virtualSize(),
                    )} sat/vbyte)`}
                  </dd>
                </dl>
                <div className="form-group">
                  <label htmlFor="tx-hex">Hex</label>
                  <textarea className="form-control" id="tx-hex" readOnly value={tx.toHex()} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default CreateTxScreen;
