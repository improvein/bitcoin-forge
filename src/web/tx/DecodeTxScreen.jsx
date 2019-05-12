import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import txService from '../../service/tx';

import Button from '../components/Button';

class DecodeTxScreen extends Component {
  constructor() {
    super();
    this.state = {
      txHexa: '',
      tx: null,
      errorMessage: '',
    };

    this.onTxHexaChange = this.onTxHexaChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onTxHexaChange(event) {
    const txHexa = event.target.value;

    this.setState({
      txHexa,
    });
  }

  submit() {
    const { txHexa } = this.state;

    try {
      const tx = txService.decodeTx(txHexa);
      this.setState({
        tx,
        errorMessage: '',
      });
    } catch (err) {
      console.error('Decoding tx: ', err);
      this.setState({
        errorMessage: err.message,
      });
    }
  }

  render() {
    const { tx, errorMessage } = this.state;

    return (
      <div>
        <h1>Decode Transaction</h1>
        <p>Decode a transaction from its hexadecimal notation.</p>
        <form id="decodetx-form" className="">
          <div className="">
            <div className="form-group">
              <label htmlFor="txhexa">Hexadecimal notation</label>
              <textarea
                id="txhexa"
                name="txhexa"
                className="form-control"
                rows="5"
                onChange={this.onTxHexaChange}
              />
            </div>
          </div>
          <div className="">
            <Button text="Decode transaction" btnClass="primary" onClick={this.submit} />
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
                </dl>

                <div className="form-group">
                  <label>Inputs</label>
                  <div className="list-group" id="inputs-list">
                    {tx.ins.map(input => (
                      <div className="list-group-item" key={`${input.hash}${input.index}`}>
                        <dl className="row">
                          <dt className="col-sm-3">Hash</dt>
                          <dd className="col-sm-9">{input.hash}</dd>

                          <dt className="col-sm-3">Index</dt>
                          <dd className="col-sm-9">{input.index}</dd>

                          <dt className="col-sm-3">Script</dt>
                          <dd className="col-sm-9">{input.script}</dd>

                          <dt className="col-sm-3">Sequence</dt>
                          <dd className="col-sm-9">{input.sequence}</dd>

                          <dt className="col-sm-3">Witness</dt>
                          <dd className="col-sm-9">{input.witness}</dd>
                        </dl>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Outputs</label>
                  <div className="list-group" id="inputs-list">
                    {tx.outs.map(output => (
                      <div className="list-group-item" key={`${output.script}`}>
                        <dl className="row">
                          <dt className="col-sm-3">Value</dt>
                          <dd className="col-sm-9">{`${output.value} sat`}</dd>

                          <dt className="col-sm-3">Script</dt>
                          <dd className="col-sm-9">{output.script}</dd>
                        </dl>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default DecodeTxScreen;
