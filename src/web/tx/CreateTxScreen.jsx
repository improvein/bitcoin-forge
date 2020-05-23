import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import txService from '../../service/tx';

import { Button, ButtonExpandable } from '../components';
import TxInputForm from './TxInputForm';
import TxOutputForm from './TxOutputForm';
import { TxInput, TxOutput } from '../../model';
import * as Constants from '../../model/Constants';

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
    this.onRemoveInput = this.onRemoveInput.bind(this);

    this.onAddOutput = this.onAddOutput.bind(this);
    this.onAddOpReturn = this.onAddOpReturn.bind(this);
    this.onUpdateOutput = this.onUpdateOutput.bind(this);
    this.onRemoveOutput = this.onRemoveOutput.bind(this);

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

  //#region Inputs

  onAddInput(event) {
    const { inputs } = this.state;
    // get the last index used
    let lastIndex = 0;
    if (inputs.length > 0) {
      lastIndex = Math.max.apply(
        Math,
        inputs.map((input) => input.index),
      );
    }
    const txInput = new TxInput({ index: lastIndex + 1 });
    inputs.push(txInput);

    this.setState({
      inputs,
    });
  }

  onUpdateInput(txInput) {
    const { inputs } = this.state;
    // find the input to update
    const arrayPos = inputs.findIndex((input) => input.index === txInput.index);
    // now replace the old TxInput with the new one
    inputs.splice(arrayPos, 1, txInput);

    this.setState({
      inputs,
    });
  }

  onRemoveInput(inputIndex) {
    const { inputs } = this.state;

    const arrayIndex = inputIndex - 1;
    // remove the input at position index
    inputs.splice(arrayIndex, 1);

    // update in two parts to prevent React mixing and confusing the indexes (used for listing)
    this.setState(
      {
        inputs,
      },
      () => {
        // now update index for following indexes
        for (let i = arrayIndex; i < inputs.length; i++) {
          inputs[i].index = inputs[i].index - 1;
        }

        this.setState({
          inputs,
        });
      },
    );
  }

  //#endregion Inputs

  //#region Outputs

  onAddOutput() {
    const { outputs } = this.state;
    // get the last index used
    let lastIndex = 0;
    if (outputs.length > 0) {
      lastIndex = Math.max.apply(
        Math,
        outputs.map((output) => output.index),
      );
    }

    const txOutput = new TxOutput(Constants.TXOUTPUT_STANDARD, lastIndex + 1);
    outputs.push(txOutput);

    this.setState({
      outputs,
    });
  }

  onAddOpReturn() {
    const { outputs } = this.state;

    // get the last index used
    let lastIndex = 0;
    if (outputs.length > 0) {
      lastIndex = Math.max.apply(
        Math,
        outputs.map((output) => output.index),
      );
    }

    const txOutput = new TxOutput(Constants.TXOUTPUT_OPRETURN, lastIndex + 1);
    outputs.push(txOutput);

    this.setState({
      outputs,
    });
  }

  onUpdateOutput(txOutput) {
    const { outputs } = this.state;
    // find the input to update
    const arrayPos = outputs.findIndex((output) => output.index === txOutput.index);
    // now replace the old TxInput with the new one
    outputs.splice(arrayPos, 1, txOutput);

    this.setState({
      outputs,
    });
  }

  onRemoveOutput(outputIndex) {
    const { outputs } = this.state;

    const arrayIndex = outputIndex - 1;
    // remove the output at position index
    outputs.splice(arrayIndex, 1);

    // update in two parts to prevent React mixing and confusing the indexes (used for listing)
    this.setState(
      {
        outputs,
      },
      () => {
        // now update index for following indexes
        for (let i = arrayIndex; i < outputs.length; i++) {
          outputs[i].index = outputs[i].index - 1;
        }

        this.setState({
          outputs,
        });
      },
    );
  }

  //#endregion Outputs

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
    const { isTestnet, inputs, outputs, tx, errorMessage } = this.state;

    // calculate the estimated fee
    let estimatedFee = 0;
    inputs.forEach((input) => {
      estimatedFee += input.amount;
    });
    outputs.forEach((output) => {
      estimatedFee -= output.amount;
    });

    // calculate how many opreturns are
    const outputsOpReturn = outputs.filter((output) => output.type === Constants.TXOUTPUT_OPRETURN).length;

    return (
      <div>
        <h1>Create Transaction</h1>
        <p>Create (forge) a transaction indicating how the inputs and ooutputs are composed.</p>
        <form id="tx-form" className="row">
          <div className="col-6">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Network</label>
              <div className="col-sm-9">
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="network-testnet"
                    name="network"
                    className="custom-control-input"
                    value="testnet"
                    checked={isTestnet}
                    onChange={this.onNetworkChange}
                  />
                  <label className="custom-control-label" htmlFor="network-testnet">
                    Testnet
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="network-mainnet"
                    name="network"
                    className="custom-control-input"
                    value="mainnet"
                    checked={!isTestnet}
                    onChange={this.onNetworkChange}
                  />
                  <label className="custom-control-label" htmlFor="network-mainnet">
                    Mainnet
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6" />
          <div className="col-sm">
            <h2>
              <div className="float-right">
                <Button btnClass="primary" size="sm" onClick={this.onAddInput}>
                  <FontAwesomeIcon icon="plus-circle" className="mr-1" />
                  Add new input
                </Button>
              </div>
              Inputs
            </h2>
            {inputs.map((input) => (
              <TxInputForm key={input.index} item={input} onUpdate={this.onUpdateInput} onRemove={this.onRemoveInput} />
            ))}
          </div>
          <div className="col-sm-auto d-flex align-items-center">
            <FontAwesomeIcon icon="arrow-right" />
          </div>
          <div className="col-sm">
            <h2>
              <div className="float-right">
                <Button btnClass="primary" size="sm" onClick={this.onAddOutput}>
                  <FontAwesomeIcon icon="plus-circle" className="mr-1" />
                  Add new output
                </Button>
                <Button btnClass="primary" size="sm" onClick={this.onAddOpReturn} disabled={outputsOpReturn > 0}>
                  <FontAwesomeIcon icon="plus-circle" className="mr-1" />
                  Add OP_RETURN
                </Button>
              </div>
              Outputs
            </h2>
            {outputs.map((output) => (
              <TxOutputForm key={output.index} item={output} onUpdate={this.onUpdateOutput} onRemove={this.onRemoveOutput} />
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
            <Button text="Forge transaction" btnClass="primary" onClick={this.submit} />
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
                  <dd className="col-sm-9">{`${estimatedFee} sat (${Math.round(estimatedFee / tx.virtualSize())} sat/vbyte)`}</dd>
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
